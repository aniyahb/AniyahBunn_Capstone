const dotenv = require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 2500
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
                // res.status(400).json({error: 'Email already exists'});
                console.error('Error creating user:', error);
                if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                    // Unique constraint failed on email field
                    return res.status(400).json({ error: 'Email already exists' });
                } else {
                    // Handle other errors appropriately
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
    const {email,password} = req.body
    const user = await prisma.user.findFirst({where: {email:email} })
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error: 'Invalid email or password'})
    }
    res.json ({message:'Logged in successfully'})
})

// Logout Endpoint
app.post('/logout', (req,res) =>{
    res.session.destroy(error => {
        if(error){
            return res.status(500).json({ error:'Failed to log out' })
        }
        res.clearCookie('connect.sid')
        res.json({ message:'Logged out successfully!'})
    })
})

// Popular Recipes Fetch
app.get('/', async (req, res) => {
    try {
        const apiResponse = await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${import.meta.env.VITE_API_KEY}`);
        const { recipes } = await apiResponse.json();
        res.json(recipes);
        if (!apiResponse.ok) {
            throw new Error(`Failed to fetch recipes from API: ${apiResponse.status} - ${apiResponse.statusText}`);
        }
        const createdRecipes = await Promise.all(
                recipes.map(recipe => {
                    return prisma.recipe.create({
                        data: {
                            title: recipe.title,
                            image: recipe.image,
                            cuisine: recipe.cuisine,
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions,
                        }
                    });

                })
            );

    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});



// app.get('/', async (req, res) => {
//     res.send(`Welcome to Aniyah's Capstone!`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
