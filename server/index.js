// > Essentials 
const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
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
  exposedHeaders: ['speed_cookie']
}))

app.listen(PORT, () => console.log(`Server started on ${PORT}`))

// ^ How the user will signin/logout/register for an account
app.use('/auth', require('./router/user'))

app.get('/users', async (req, res) => {
  const results = await db.promise().query(`SELECT * FROM STUDENT`)
  res.status(200).send(results[0])
})

app.post('/users', (req, res) => {
  const {StudentID, StudentName} = req.body
  
  // Check to see if both are 'truthy'
  if(StudentID && StudentName){
    try{
      db.promise().query(`INSERT INTO STUDENT VALUES('${StudentID}', '${StudentName}')`)
      res.status(201).send({
        msg: 'Added Student'
      })
    }catch(err){
      console.log(err)
    }

  }
  
})