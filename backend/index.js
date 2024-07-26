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

// Sending favorite recipes summary
async function sendFavoriteRecipesSummary() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        const favoriteCount = await prisma.userFavoriteRecipe.count({
            where: { userId: user.id }
        });
        let summary = `Hey ${user.name}! 👋\n\n`;
        if (favoriteCount > 0) {
            summary += `🎉 Great news! You have ${favoriteCount} favorite recipe${favoriteCount > 1 ? 's' : ''} saved in your MealMaster collection!\n\n`;
            summary += `🍽️ Ready to explore your culinary treasures? Log in to view your favorites and get cooking!\n`;
            summary += `🔗 Visit MealMaster here: http://localhost:5173/login\n\n`;
            summary += `👨‍🍳 Remember, the kitchen is your playground. Why not try one of your favorites this week?\n\n`;
        } else {
            summary += `🍳 It looks like you haven't saved any favorite recipes yet. No worries – the culinary world is waiting for you!\n\n`;
            summary += `🔍 Log in to MealMaster and start exploring delicious recipes. Save the ones you love!\n`;
            summary += `🔗 Start your flavor journey here: http://localhost:5173/login\n\n`;
        }
        summary += `🌟 Feeling adventurous? Here are some ideas to spice up your cooking routine:\n`;
        summary += `- Try a new cuisine this week\n`;
        summary += `- Challenge yourself to cook with a ingredient you've never used before\n`;
        summary += `- Host a virtual cooking party with friends\n\n`;
        summary += `💡 Don't forget to keep adding to your favorites. The more you save, the more delicious options you'll have at your fingertips!\n\n`;
        summary += `Happy cooking, and enjoy your MealMaster experience!\n\n`;
        summary += `Bon appétit! 🥘✨\n`;
        await sendEmail(user.email, '🍽️ Your MealMaster Favorites Await!', summary);
    }
}

cron.schedule('0 0 * * *', () => {
    console.log('Running cron job to send favorite recipes summary');
    sendFavoriteRecipesSummary().catch(console.error);
});


app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
