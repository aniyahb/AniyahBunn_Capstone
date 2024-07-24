const dotenv = require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const app = express()
const PORT = process.env.PORT || 2500
app.use(express.json())
const cors = require('cors')
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const JWT_SECRET = process.env.JWT_SECRET ;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Sign Up Endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    } else {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {email},
            });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists. Please login.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        console.log(`Login attempt for email: ${email}`);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Password valid: ${isPasswordValid ? 'Yes' : 'No'}`);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            secretOrPrivateKey = process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({
            message: 'Logged in successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Authenication Token
const authenticateToken = (req, res, next) => {
    console.log("AAAA")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {console.log(err);return res.sendStatus(403);}
        req.user = user;
        // console.log(user)
        next();
    });
};

// Check if a recipe is favorited
app.get('/check-favorite/:recipeId', authenticateToken, async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;
    try {
        const favorite = await prisma.userFavoriteRecipe.findFirst({
            where: {
                userId: userId,
                recipeId: parseInt(recipeId)
            },
        });
        res.json({ isFavorite: !!favorite });
    } catch (error) {
        console.error('Error checking favorite:', error);
        res.status(500).json({ error: 'Failed to check favorite status' });
    }
});

// Add favorite recipe
app.post('/add-favorite', authenticateToken, async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;
    console.log('Received request to add favorite:', { userId, recipeId });
    try {
        const favorite = await prisma.userFavoriteRecipe.create({
            data: {
                userId: userId,
                recipeId: parseInt(recipeId)
            },
        });
        console.log('Favorite added successfully:', favorite);
        res.status(201).json(favorite);
    } catch (error) {
        console.error('Detailed error adding favorite:', error);
        res.status(500).json({
            error: 'Failed to add favorite',
            details: error.message,
            stack: error.stack,
            name: error.name
        });
    }
});

// Remove favorite recipe
app.delete('/remove-favorite/:recipeId', authenticateToken, async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;
    console.log('Received request to delete favorite:', { userId, recipeId });

    try {
        await prisma.userFavoriteRecipe.deleteMany({
            where: {
                userId: userId,
                recipeId: parseInt(recipeId)
            },
        });

        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

// Fetching favorites
app.get('/favorite-recipes', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const favorites = await prisma.userFavoriteRecipe.findMany({
            where: {
                userId: userId
            },
            select: {
                recipeId: true
            }
        });
        const favoriteIds = favorites.map(fav => fav.recipeId);
        res.json(favoriteIds);
    } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        res.status(500).json({ error: 'Failed to fetch favorite recipes' });
    }
});

// Emailing W/ Cron
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    let info = await transporter.sendMail({
        from: ' "MealMaster" <mealmasterupdates@gmail.com>',
        to: to,
        subject: subject,
        text: text
    });
    console.log('Message sent: %s', info.messageId);
}

// Getting user's favorite recipes
async function getUserFavoriteRecipes(userId) {
    const favorites = await prisma.userFavoriteRecipe.findMany({
        where: { userId: userId },
        include: { recipe: true }
    });

    return favorites.map(fav => fav?.recipeId);
}

// Sending favorite recipes summary
async function sendFavoriteRecipesSummary() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const recipes = await getUserFavoriteRecipes(user.id);

        if (recipes.length > 0) {
            let summary = `Hey ${user.name}! 👋 Ready for a tasty adventure?\n\n`;
            summary += `🎉 We've cooked up a special list of your favorite recipes just for you! 🍳\n\n`;

            recipes.forEach((recipe, index) => {
                summary += `${index + 1}. 🍽️ ${recipe.title}\n`;
                summary += `   Craving this deliciousness? Whip it up here: http://localhost:5173/LogIn\n\n`;
            });

            summary += `\n👨‍🍳 Feeling inspired? Here are some fun ideas:\n`;
            summary += `- Challenge yourself to cook one of these this week!\n`;
            summary += `- Host a themed dinner party featuring your top pick\n`;
            summary += `- Try a twist on your favorite recipe - add a secret ingredient!\n\n`;

            summary += `🌟 Remember, you're the star of your kitchen. Keep exploring and happy cooking!\n\n`;
            summary += `P.S. Got a new favorite? Don't forget to add it to your list on MealMaster!\n`;

            await sendEmail(user.email, '🍽️ Your Tasty Favorites Await!', summary);
        }
    }
}

cron.schedule('0 0 * * *', () => {
    console.log('Running cron job to send favorite recipes summary');
    sendFavoriteRecipesSummary().catch(console.error);
});



//storing
// async function fetchAndAddRecipes() {
//     try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.VITE_API_KEY}`);
//         // console.log(response);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         const recipes = data.recipes;

//         for (let recipe of recipes) {
//             await prisma.recipe.upsert({
//                 where: { spoonacularId: recipe.id },
//                 update: {
//                     title: recipe.title,
//                     image: recipe.image,
//                     ingredients: JSON.stringify(recipe.extendedIngredients),
//                     instructions: recipe.instructions || '',
//                 },
//                 create: {
//                     spoonacularId: recipe.id,
//                     title: recipe.title,
//                     image: recipe.image,
//                     ingredients: JSON.stringify(recipe.extendedIngredients),
//                     instructions: recipe.instructions || '',
//                 },
//             });
//         }

//         console.log('Recipes added successfully');
//     } catch (error) {
//         console.error('Error adding recipes:', error);
//     }
// }

// cron.schedule('0 */6 * * *', () => {
//     console.log('Running cron job to add recipes');
//     fetchAndAddRecipes();
// });

// fetchAndAddRecipes();

app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
