const express = require("express")
const db = require('./database')

const cors = require('cors')
const dotenv = require('dotenv').config()

const cookieParser = require('cookie-parser')

const morgan = require('morgan')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true,}))

app.use(morgan('tiny'))

app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true,
  exposedHeaders: ['speed_cookie']
}))


app.get("/", (req, res) => {
  res.json({ message: "ok" });
})

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})