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

        // ? Don't forget to add quotes to SQL queries!!! 
        const existingUsername = await db.promise().query(`SELECT * FROM STUDENT WHERE username = '${username}'`) 

        if(existingUsername[0][0]){
            return res.status(400).json({
                errorMessage: 'An account with this username exist already'
            })    
        }

        // * Needed to not STORE passwords in the database
        const salt = await bycrypt.genSaltSync(10)

        // * Hash the password using bycrypt
        const passwordHash = await bycrypt.hashSync(password, salt)

        console.log('BEFORE USER')
        // * Add the user to the database
        // const user = 

        await db.promise().query(`INSERT INTO STUDENT(name, username, password) VALUES('${name}', '${username}', '${passwordHash}')`)
    
        
        // ? Now, let's give the user a cookie to save their session
        const token = jwt.sign({
            id: await db.promise().query(`SELECT id FROM STUDENT WHERE username= '${username}'`)
        },
        process.env.JWT_SECRET
        )

        res.cookie(
            'speedrun_cookie', // ? Name of the cookie we are giving it
            token, // ? Where the data will come from
            {
                httpOnly: true,
                sameSite:
                    process.env.NODE_ENV == 'development' ? 'lax'
                        :
                    process.env.NODE_ENV == 'production' && 'none',
                secure:
                    process.env.NODE_ENV == 'development' ? false
                        :
                    process.env.NODE_ENV == 'production' && true

            }
        ).send()

    }catch{
        // ? Error 500 means server error
        res.status(500).send
    }
})


module.exports = router