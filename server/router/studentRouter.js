// > How our server will handle a person logging and registering for an account
const router = require('express').Router()

const Classes = require('../models/classModel')
const Student = require('../models/studentModel')

const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../middleware/auth')

// ^ POST request :: User wants to register for an account
router.post('/register', async(req, res) => {
    try{
        // * Destructure it for ease of access
        const {name, email, username, profilePicture, password, passwordVerify} = req.body
        
        // * User is missing fields
        if(!name ||!email || !username || !password || !passwordVerify ){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // * Password must be greater than 6 characters
        if(password.length < 6){
            return res.status(400).json({
                errorMessage: "Please enter a password that's at least six characters long" 
            })
        }

        // * Password and PasswordVerify must match
        if(password !== passwordVerify){
            return res.status(400).json({
                errorMessage: 'Password and Password Verify do not match'
            })
        }

        // * Check to see if the email exist in the database
        if(await Student.findOne({email})){
            return res.status(400).json({
                errorMessage: 'An account with this email already exist'
            })
        }

        // * A MongoDB command to search the database for a username
        if(await Student.findOne({username})){
            return res.status(400).json({
                errorMessage: 'An account with this username already exist'
            })
        }
        // ^ After passing the validation :: HAsh the password :: NEVER PLACE THE PASSWORD IN THE DB
        const passwordHash = await bycrypt.hashSync(password, await bycrypt.genSaltSync(10))

        // ! This is the admin account that will have elevated privileges
        if(username === 'POTUS'){
            const newUser = new Student({
                name,
                email,
                username,
                profileBanner: 'https://avatars.githubusercontent.com/u/64375555?s=400&u=b9baf31e30aae183aa3f33d5f927d813d44280ae&v=4',
                profilePicture: 'https://avatars.githubusercontent.com/u/64375555?s=400&u=b9baf31e30aae183aa3f33d5f927d813d44280ae&v=4',
                passwordHash
            })
            const savedUser = await newUser.save()

            // * ============================================
            // ^ Create a unique token with the given credentials and a cookie
            
            // * A unique key given to this id and only this id with the given credentials
            const token = jwt.sign(
                {
                    id: savedUser._id // ? Get MongoDB id and place it in the token
                }, 
                process.env.JWT_SECRET
            )

            // * A cookie that utilizes the token to allow a user to stay logged in
            res.cookie(
                'speedrun_cookie', // ? Name of the cookie we are giving it
                token, // ? Where the data from the token will come from
                {
                    httpOnly: true,
                    sameSite:
                        process.env.NODE_ENV === 'development' ? 'lax'
                        : process.env.NODE_ENV === 'production' && 'none',
                    secure:
                        process.env.NODE_ENV === 'development' ? false
                        : process.env.NODE_ENV === 'production' && true
                }
            ).send()

        }

        // * Create a student object
        const newStudent = new Student({
            name,
            email,
            username,
            profileBanner: 'https://res.cloudinary.com/durogtr7u/image/upload/v1641253201/banner_kbfvfr.png',
            profilePicture,
            passwordHash
        })

        // * Places the user object into the database
        await newStudent.save()

        // * ============================================
        // ^ Create a unique token with the given credentials and a cookie
        
        // * A unique key given to this id and only this id with the given credentials
        const token = jwt.sign({
                id: newStudent._id // ? Get MongoDB id and place it in the token
            }, 
            process.env.JWT_SECRET
        )

        // * A cookie that utilizes the token to allow a user to stay logged in
        res.cookie(
            'speedrun_cookie', // ? Name of the cookie we are giving it
            token, // ? Where the data from the token will come from
            {
                httpOnly: true,
                sameSite:
                    process.env.NODE_ENV === 'development' ? 'lax'
                    : process.env.NODE_ENV === 'production' && 'none',
                secure:
                    process.env.NODE_ENV === 'development' ? false
                    : process.env.NODE_ENV === 'production' && true
            }
        ).send()
        
    }catch(err){
        res.status(500).send()
    }
})

// ! Is this useful in any way?
// ^ PUT request :: A user wants to change their x
router.put('/:username', auth, async(req, res) => {
    const {originalUsername, newUsername} = req.body
    
    if(!originalUsername || !newUsername){
        return res.status(401).json({
            errorMessage: 'Missing parameters'
        })
    }
    console.log(originalUsername)
    console.log(newUsername)

    const existingUsername = await Student.findOne({username: originalUsername})

    if(!existingUsername){
        return res.status(401).json({
            errorMessage: "User doesn't exist"
        })
    }

    
    if(await Student.findOne({username: newUsername})){        
        return res.status(401).json({
            errorMessage: "Username already taken"
        })
    }

    existingUsername.username = newUsername
    const savedUsername = await existingUsername.save()

    res.json(savedUsername)
    
    

})

// ^ POST request :: A user wants to login to their account
router.post('/login', async (req, res) => {
    try{
        // * Destructure it 
        const {email, password} = req.body

        // * Basic validation before asking the database
        if(!email || !password){
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }

        // * Get the user account that belongs to that email
        const existingUser = await Student.findOne({email})
        
        // * If a user without that email is sent, send this
        if(!existingUser){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }

        // * See if the password they gave is the same as an encrypted password
        const isCorrectPassword = await bycrypt.compare(password, existingUser.passwordHash)

        if(!isCorrectPassword){
            return res.status(401).json({
                errorMessage: 'Wrong email or password'
            })
        }
        
        // * Create a token for the user
        const token = jwt.sign(
            {
                id: existingUser._id // ? Get MongoDB id and place it in the token
            },  
            process.env.JWT_SECRET // * Make sure we are using a token from our server!
        )

        res.cookie(
            'speedrun_cookie', 
            token, 
            {
                httpOnly: true,
                sameSite: 
                    process.env.NODE_ENV === 'development' ? 'lax' 
                    : process.env.NODE_ENV === 'production' && 'none',
                secure: 
                    process.env.NODE_ENV === 'development' ? false :
                    process.env.NODE_ENV === 'production' && true
            }
        ).send()

    }catch(err){
        res.status(500).send()
    }
})

// ^ GET request :: Delete the cookie 'speedrun_cookie from localHost
// ? You need to be logged in to logout
router.get('/logout', auth, async(req, res) => {
    try{
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
            }
        ).send()
        
    }catch(err){
        return res.json(null)
    }
})

// TODO: Add a method to register for classes!
// 

// TODO: REFACTOR THIS
// ^ GET request :: Just like the auth middleware, but now axios can call it
// ? Not sure what other way to see if a user has the speedrun_cookie without entering credentials
router.get('/loggedIn', async(req, res) => {
    try{
        const token = req.cookies.speedrun_cookie

        // * Does the cookie even exist?
        if(!token){
            return res.json(null)
        }

        // * Mix the token with JWT_SECRET 
        const validatedUser = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )

        const existingUser = await Student.findById(validatedUser.id)
        
        // * Gives us the user email and username 
        res.send(
            //email: existingUser.email,
            //username: existingUser.username,
            //profilePicture: existingUser.profilePicture
            // ! Just give them everything
            existingUser
        )
        
    }catch(err){
        return res.json(null)
    }
})

// router.get('/:username', async(req, res) => {
//     const {username} = req.params
//     if(!username) return res.status(401).json({errorMessage: 'No username detected'})

//     const existingStudent = await Student.findOne({username})

//     if(!existingStudent) return res.status(401).json({errorMessage: "Student doesn't exist"})

    
// }) 

// ! SEMESTER ONE ONLY WITH TWO CLASSES!
router.put('/:username/:ClassId', async(req, res) => {
    const {username, ClassId} = req.params

    if(!username || !ClassId){
        if(!ClassId) return res.status(401).json({errorMessage: 'No classId detected'})
        
        return res.status(401).json({errorMessage: 'No username detected'})
    }

    // ? Find the student
    const existingStudent = await Student.findOne({username})


    if(!existingStudent){
        return res.status(401).json({errorMessage: "Student doesn't exist"})
    }

    // ? Find the class
    let getClass = await Classes.findOne({ClassId})
    

    
    existingStudent.courses.push(getClass)  
    //existingStudent.semesterOne.classOneId = getClass._id
    await existingStudent.save()
    return res.send(existingStudent)
    
})


// ? localhost:5000/auth/JohnUser
// ! Problem: Anyone with the link can access this data!
router.get('/:username', async(req, res) => {
    try{
        const {username} = req.params

        if(!username){
            return res.status(401).json({
                errorMessage: 'No username detected'
            })
        }
        
        const existingUser = await Student.findOne({username})
        
        if(!existingUser){
            return res.status(401).json({
                errorMessage: "User doesn't exist"
            })
        }
        
        // * Populate the data
        return res.json(await Student.find({username})
            .populate({
                path: 'courses',
                //select:['ClassId', 'Name', 'Professor', 'Material.chapterOne.reading']
                select:['ClassId', 'Name', 'Professor', 'Material']
            })
        )
    }catch(err){
        return res.json(500).send()
    }
})

module.exports = router