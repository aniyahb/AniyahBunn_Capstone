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
    console.log("BLAHHHH")
    const { recipeId } = req.params;
    console.log({req})
    const userId = req.user.id;
    try {
        const favorite = await prisma.userFavoriteRecipe.findFirst({
            where: {
                    userId:userId,
                    recipeId: parseInt(recipeId)
            },
        });
        res.json({ isFavorite: !favorite });
    } catch (error) {
        console.log(error)
        console.error('Error checking favorite:', error);
        res.status(500).json({ error: 'Failed to check favorite status' });
    }
});

// Add favorite recipe
app.post('/add-favorite', authenticateToken, async (req, res) => {
    const { spoonacularId, recipeId } = req.body;
    const userId = req.user.id;
    console.log('Received request to add favorite:', { userId, recipeId });
    try {
        console.log(userId)
        console.log(recipeId)

        const recipe = await prisma.recipe.findUnique({
            where: { spoonacularId: parseInt(spoonacularId) },
        });
        console.log("recipe", recipe)
        if (recipe) {
            const favorite = await prisma.userFavoriteRecipe.create({
                data: {
                    user: { connect: { id: userId }},
                    recipe: { connect: { id: recipeId }}
                },
            });
            console.log('Favorite added successfully:', favorite);
            res.status(201).json(favorite);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
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
        const recipe = await prisma.recipe.findUnique({
            where: { spoonacularId: parseInt(recipeId) },
        });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        await prisma.userFavoriteRecipe.deleteMany({
            where: {
                userId: userId,
                recipeId: recipe.id
            },
        });

        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});


app.get('/recipes', async (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 60;

    try {
        const recipes = await prisma.recipe.findMany({
            skip: offset,
            take: limit,
        });
        res.json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});



//storing
async function fetchAndAddRecipes() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.VITE_API_KEY}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const recipes = data.recipes;

        for (let recipe of recipes) {
            await prisma.recipe.upsert({
                where: { spoonacularId: recipe.id },
                update: {
                    title: recipe.title,
                    image: recipe.image,
                    ingredients: JSON.stringify(recipe.extendedIngredients),
                    instructions: recipe.instructions || '',
                },
                create: {
                    spoonacularId: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    ingredients: JSON.stringify(recipe.extendedIngredients),
                    instructions: recipe.instructions || '',
                },
            });
        }

        console.log('Recipes added successfully');
    } catch (error) {
        console.error('Error adding recipes:', error);
    }
}

cron.schedule('0 */6 * * *', () => {
    console.log('Running cron job to add recipes');
    fetchAndAddRecipes();
});

fetchAndAddRecipes();

app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
