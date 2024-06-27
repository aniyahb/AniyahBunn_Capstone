const dotenv = require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 2500

app.use(express.json())


app.get('/', async (req, res) => {
    res.send(`Welcome to Aniyah's Capstone!`);
});

app.get('/test-path', (req, res) => {
    res.send('This is a test response.')
});

// app.get('/idk', (req, res) => {
//     res.send(`
//       <html>
//       <head>
//         <title>Adopt-a-Pet</title>
//       </head>
//       <body>
//         <h1>Hello, World!</h1>
//         <p>Welcome to my server.</p>
//       </body>

//       </html>
//     `)
//   })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
