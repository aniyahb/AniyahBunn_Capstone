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


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


// Sign Up Endpoint
app.post('/signup', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {email},
    });
    if (existingUser) {
        console.log(`Email already exists please login.`);
        return res.json({error: 'Email already exists'});


    } else {
        if(password ===  confirmPassword) {
            const hashedPassword = await bcrypt.hash(password,10);
            try{
                const user = await prisma.user.create({
                    data: {name, email, password: hashedPassword},
                });
                res.status(201).json(user);
            }catch (error){
                console.error('Error creating user:', error);
                if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                    return res.status(400).json({ error: 'Email already exists. Please Login ' });
                } else {
                    return res.status(500).json({ error: 'Failed to create user' });
                }
            }
        } else{
            return res.status(400).json({message: 'Passwords do not match'})
        }
    }
});


// Login Endpoint
app.post('/login', async(req,res) =>{
    console.log('Login request received:', req.body);
    const {email,password} = req.body
    try{
        const user = await prisma.user.findFirst({where: {email:email} })
        console.log('User found:', user ? 'Yes' : 'No');
        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log('Login failed: Invalid credentials');
            return res.status(401).json({ error: 'Invalid email or password'})
        }
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        console.log('Token generated:', token);
        console.log('Sending response');
        res.json({ message: 'Logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
    }
});


app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});




// Check favorite status
app.get('/check-favorite/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.query.userId; // Get userId from query parameter

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
        const favorite = await prisma.userFavoriteRecipe.findUnique({
            where: {
            userId_recipeId: {
                userId: parseInt(userId),
                recipeId: parseInt(id)
            }
            }
        });
        res.json({ isFavorite: !!favorite });
    } catch (error) {
        console.error('Error checking favorite status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Add favorite
app.post('/add-favorite', async (req, res) => {
    const { recipeId, userId } = req.body;

        if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
        const favorite = await prisma.userFavoriteRecipe.create({
            data: {
            userId: parseInt(userId),
            recipeId: parseInt(recipeId)
            }
        });

        res.json({ message: 'Favorite added successfully', favorite });
        } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Remove favorite
app.delete('/remove-favorite/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.query.userId; // Get userId from query parameter

        if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
        await prisma.userFavoriteRecipe.delete({
            where: {
            userId_recipeId: {
                userId: parseInt(userId),
                recipeId: parseInt(id)
            }
            }
        });

        res.json({ message: 'Favorite removed successfully' });
        } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });
