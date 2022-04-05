const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

// ? Access to send data to our server from a WHITELISTED list
const cors = require('cors')

// ? Gives us the ability to access .env to protect sensitive info
const dotenv = require('dotenv').config()

// ? Allows us to access cookies that we can use to validate the user [Keeps them logged in]
const cookieParser = require('cookie-parser')

// * JSON middleware :: Allow POST 
app.use(express.json())
// * WHITELIST LINKS
app.use(cors({
    origin:['http://localhost:3000','https://speedrununi.netlify.app'],
    credentials: true,
    exposedHeaders: ['speedrun_cookie']
}))

// * Gives us mini-details about REQUEST being made to the server
app.use(morgan('tiny'))

// * Cnvert cookie strings --> Objects
app.use(cookieParser())

app.use('/courses', require('./router/classRouter'))
app.use('/auth', require('./router/studentRouter'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))

// * MongoDB [Local Version for speed] 
//mongoose.connect(`mongodb+srv://rosenthal:${process.env.MONGO_PASSWORD}@arisadatabase.wez6h.mongodb.net/speedrunDB?retryWrites=true&w=majority`,
mongoose.connect(`mongodb://localhost:27017/sru`, (err) => {
    if(err) return console.log(err)
    
    console.log('Connected to MongoDB')
})