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
            { userId: user.id, email: user.email },
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


// NEW
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// add favorite recipe
app.post('/add-favorite', authenticateToken, async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    console.log('Received request to add favorite:', { userId, recipeId });
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: parseInt(recipeId) },
        });

        console.log('Recipe lookup result:', recipe);

        if (!recipe) {
            console.log('Recipe not found:', recipeId);
            return res.status(404).json({ error: 'Recipe not found' });
        }

        const favorite = await prisma.userFavoriteRecipe.create({
            data: {
                userId,
                recipeId: parseInt(recipeId),
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
    const userId = req.user.userId;

    try {
        await prisma.userFavoriteRecipe.delete({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId: parseInt(recipeId),
                },
            },
        });
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

// Check if a recipe is favorited
app.get('/check-favorite/:recipeId', authenticateToken, async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.userId;

    try {
        const favorite = await prisma.userFavoriteRecipe.findUnique({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId: parseInt(recipeId),
                },
            },
        });
        res.json({ isFavorite: !!favorite });
    } catch (error) {
        console.error('Error checking favorite:', error);
        res.status(500).json({ error: 'Failed to check favorite status' });
    }
});

// Fetch favorite recipes
app.get('/favorite-recipes', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const favorites = await prisma.userFavoriteRecipe.findMany({
            where: { userId },
            include: { recipe: true },
        });
        const favoriteRecipes = favorites.map(fav => fav.recipe);
        res.json(favoriteRecipes);
    } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        res.status(500).json({ error: 'Failed to fetch favorite recipes' });
    }
});

app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
