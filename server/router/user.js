const router = require('express').Router()

const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ? Connect to our SQL server
const db = require('../database/database')

// ! Middleware to verify cookies later

// ? ~~~~/auth :: REMOVE IN FINAL COPY JUST TO DEBUG
// ^ Gives a JSON object with all the users
router.get('/', async(req, res) => {
    try{

    }

    catch(err){
        res.status(500).send()
    }
})

router.post('/register', async(req, res) => {
    try{
        // * Destructure it for easier access
        const {name, username, password, passwordVerify} = req.body

        // * If any of the req.body is not present, DO NOT PASS GO
        if(!name || !username || !password){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                errorMessage: "Please enter a password that's at least 6 characters long"
            })
        }

        if(password != passwordVerify){
            return res.status(400).json({
                errorMessage: 'Password and Password Verify do not match'
            })
        }


        const existingUsername = await db.promise().query(`SELECT * FROM STUDENT WHERE username = ${username}`)
        if(existingUsername){
            return res.status(400).json({
                errorMessage: ''
            })    
        }
        
        // const results = await db.promise().query(`SELECT * FROM STUDENT`)
        // res.status(200).send(results[0])
        // db.promise().query(`INSERT INTO STUDENT VALUES('${StudentID}', '${StudentName}')`)
        // res.status(201).send({
        //     msg: 'Added Student'
        // })



    }catch{
        // ? Error 500 means server error
        res.status(500).send
    }
})


module.exports = router