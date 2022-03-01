const router = require('express').Router()

const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ? Middleware to verify we are the correct user
const auth = require('../middleware/auth')

// ? Connect to our SQL server
const db = require('../database/database')

// ! Middleware to verify cookies later

// ? ~~~~/auth :: REMOVE IN FINAL COPY JUST TO DEBUG
// ^ Gives a JSON object with all the users
router.get('/', async(req, res) => {
    try{
        res.send('Hello :D')
    }

    catch(err){
        res.status(500).send()
    }
})


// ^ Someone wants to register an account
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

// ^ A user wants to login
router.post('/login', async(req, res) => {
    try{
        
        const {username, password} = req.body

        if(!username || !password){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // ? Check the database to see if a user exist        
        const existingUser = await db.promise().query(`SELECT * FROM STUDENT WHERE username = '${username}'`) 
        
        // ? If the user DOES NOT exist, we end the logic here
        if(!existingUser[0][0]){
            return res.status(401)({
                // * We don't want to tell the 'hacker' what they got wrong
                errorMessage: 'Wrong email or password'
            })
        }

        // ? Time to check the password and see if encrpyting it is the same as the database
        const isCorrectPassword = await bycrypt.compare(password, existingUser[0][0].password)

        if(!isCorrectPassword){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }
        // ? Create a token for the user
        const token = jwt.sign(
            {
                id: existingUser[0][0].id
                //id: await db.promise().query(`SELECT id FROM STUDENT WHERE username= '${username}'`)
            },
            process.env.JWT_SECRET
        )

        res.cookie(
            'speedrun_cookie',
            token, // ? WHERE WE ARE GETTING THE DATA
            {
                httpOnly: true,
                sameSite:
                    process.env.NODE_ENV === 'development' ? 'lax' 
                        : 
                    process.env.NODE_ENV === 'production' && 'none',
                secure: 
                    process.env.NODE_ENV === 'development' ? false 
                        :
                    process.env.NODE_ENV === 'production' && true
            }
        ).send()
    }catch(err){
        res.status(500).send()
    }
})

// * GET REQUEST :: Delete the cookie 'speedrun_cookie'
// ^ YOu need to be logged in to logout
router.get('/logout', async (req, res) => {
    try{
        console.log(res.cookie[0])
        res.cookie(
            'speedrun_cookie',
            '',
            {
                httpOnly: true,
                sameSite: 
                    process.env.NODE_ENV === 'development' ? 'lax' 
                    : process.env.NODE_ENV === 'production' && 'none',
                secure: 
                    process.env.NODE_ENV === 'development' ? false :
                    process.env.NODE_ENV === 'production' && true,
                expires: new Date(0), // ? This is what clears it
            },
            
        ).send()
    }
    catch(err){
        return res.json(null)
    }
})

router.post('/test', auth, (req, res) => {

})

// TODO FIX THIS
router.get('/loggedIn', async(req, res) => {
    try{
        const token = req.cookies.speedrun_cookie

        if(!token){
            return res.json(null)
        }

        // ? Mix the token with JWT_SECRET
        const validatedUser = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        console.log(validatedUser)
        //const existingUser = await db.promise().query(`SELECT * FROM STUDENT WHERE username = '${username}'`) 
        //const existingUser = await existingUser[0][0].id
        
    }catch(err){
        return res.json(null)
    }
    

    
})

// TODO ADD AN AUTH TO VERIFY THIS IS THE CORRECT USER AND NOT ANYONE CAN LOG ANYONE OUT


module.exports = router