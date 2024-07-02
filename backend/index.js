const dotenv = require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 2500


// Sign Up Endpoint
app.post('/signUp', async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword},
        });
        res.status(201).json(user);
    }catch (error){
        res.status(400).json({error: 'Email already exists'});
    }
});

// Login Endpoint
app.post('/logIn', async(req,res) =>{
    const {email,password} = req.body
    const user = await prisma.user.findUnique({where: {email} })
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error: 'Invalid email or password'})
    }
    req.session.userId = user.id
    res.json ({message:'Logged in successfully'})
})

// Logout Endpoint
app.post('/logOut', (req,res) =>{
    res.session.destroy(error => {
        if(error){
            return res.status(500).json({ error:'Failed to log out' })
        }
        res.clearCookie('connect.sid')
        res.json({ message:'Logged out successfully!'})
    })
})


app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.get('/test-path', (req, res) => {
    res.send('This is a test response.')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
