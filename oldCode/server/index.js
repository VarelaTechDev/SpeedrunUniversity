// > Essentials 
const express = require("express")
const cors = require('cors')

// ? Allows us to have secret variables
const dotenv = require('dotenv').config()

// ? Gives us the power to send/use cookies
const cookieParser = require('cookie-parser')

// ? Allows us to see info in the terminal
const morgan = require('morgan')

// ? Where our server is hosted and useful for Heroku
const PORT = process.env.PORT

// ? Connect to our SQL server
const db = require('./database/database')

// ? Allow us to CALL express instances
const app = express()

// ^ Allow us to send data to our server/website
app.use(express.json())
app.use(express.urlencoded({extended: true,}))

// ^ Displays info to the console when we contact the server
app.use(morgan('tiny'))

// ^ A whitelist to what links are allowed or not allowed to send data
app.use(cors({
  origin: ['http://localhost:5000'], // ? We will need to put the [netlify] link here
  credentials: true,
  exposedHeaders: ['speedrun_cookie']
}))

app.listen(PORT, () => console.log(`Server started on ${PORT}`))

// ^ Middleware for signing in and registering an account
app.use('/auth', require('./router/user'))

// ^ Get a list of users 
// ! Password is shown here
app.get('/users', async (req, res) => {
  const results = await db.promise().query(`SELECT * FROM STUDENT`)
  res.status(200).send(results[0])
})