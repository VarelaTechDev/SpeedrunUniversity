// > app.use('/auth', require('./router/studentRouter'))
const router = require('express').Router()

// ? Our databases model
const Classes = require('../models/classModel')
const Student = require('../models/studentModel')

// ? npm libraries
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ? middle ware
const auth = require('../middleware/auth')

// ^ POST request :: User wants to register for an account
router.post('/register', async(req, res) => {
    try{
        // * Destructure data in the JSON form
        const {name, email, username, profilePicture, password, passwordVerify} = req.body
        // * Validation
        if(!name ||!email || !username || !password || !passwordVerify ){return res.status(400).json({errorMessage: 'Please enter all required fields'})}
        if(password.length < 6){return res.status(400).json({errorMessage: "Please enter a password that's at least six characters long" })}
        if(password !== passwordVerify){return res.status(400).json({errorMessage: 'Password and Password Verify do not match'})}
        if(await Student.findOne({email})){return res.status(400).json({errorMessage: 'An account with this email already exist'})}
        if(await Student.findOne({username})){return res.status(400).json({errorMessage: 'An account with this username already exist'})}

        
        const passwordHash = await bycrypt.hashSync(password, await bycrypt.genSaltSync(10))

        // * Using the data we sent --> Create a user Object that [Pack them all into an object]
        const newStudent = new Student({
            name,
            email,
            username,
            profileBanner: 'https://res.cloudinary.com/durogtr7u/image/upload/v1641253201/banner_kbfvfr.png',
            profilePicture,
            passwordHash
        })

        await newStudent.save()


        // * Create a unique TOKEN[KEY] for the user
        const token = jwt.sign({
                id: newStudent._id // ? Get MongoDB id and place it in the token
            }, 
            process.env.JWT_SECRET
        )

        // * Return a cookie that is stored in localStorage and allows the user to stay logged in [EVEN IF WE REFRESH THE PAGE]
        res.cookie(
            'speedrun_cookie', // ? Name we are giving to the cookie we are creating
            token, // ? Where the cookie will be getting its data
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

// ^ POST request :: A user wants to login to their account
router.post('/login', async (req, res) => {
    try{
        // * Destructure data from the JSON form we send
        const {email, password} = req.body

        // * Basic validation before asking the database
        if(!email || !password){return res.status(400).json({errorMessage: 'Please enter all required fields'})}

        const existingUser = await Student.findOne({email})
        
        if(!existingUser){return res.status(401).json({errorMessage: 'Wrong email or password'})}

        // * Check to see if the password the user send is the same as the encrypted password
        const isCorrectPassword = await bycrypt.compare(password, existingUser.passwordHash)

        if(!isCorrectPassword){return res.status(401).json({errorMessage: 'Wrong email or password'})}
        
        // * Create a unique TOKEN[KEY] for the user
        const token = jwt.sign(
            {
                id: existingUser._id // ? Get MongoDB id and place it in the token
            },  
            process.env.JWT_SECRET // * Make sure we are using a token from our server!
        )

        // * Return a cookie that is stored in localStorage and allows the user to stay logged in [EVEN IF WE REFRESH THE PAGE]
        res.cookie(
            'speedrun_cookie', // ? Name we are giving to the cookie we are creating
            token, // ? Where the cookie will be getting its data
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
router.get('/logout', auth, async(req, res) => {
    try{
        res.cookie(
            'speedrun_cookie',  // ? Select this cookie from localStorage
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

// ! WARNING: WE ARE GIVING THEM EVERYTHING
// ^ GET request :: UserContext calls this methid and is what gives the frontEnd it's user info
router.get('/loggedIn', async(req, res) => {
    try{
        // * Grabs the cookie that is in our browser localStorage
        const token = req.cookies.speedrun_cookie

        if(!token)return res.json(null)

        // * Check to see if mixing the TOKEN with JWT_SECRET :: [CHECKING TO SEE IF WE MADE THE TOKEN]
        const validatedUser = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )

        const existingUser = await Student.findById(validatedUser.id)
        if(!existingUser) return res.status(401).json({errorMessage: 'Invalid Token ID!'})
        
        res.send(
            //email: existingUser.email,
            //username: existingUser.username,
            //profilePicture: existingUser.profilePicture
            existingUser
        )
        
    }catch(err){
        return res.json(null)
    }
})

// ^ PUT request :: Register a class and place it into the user Object
router.put('/:username/:ClassId', async(req, res) => {
    // * Grab the needed data from the URL
    const {username, ClassId} = req.params

    if(!username || !ClassId){
        if(!ClassId) return res.status(401).json({errorMessage: 'No classId detected'})

        return res.status(401).json({errorMessage: 'No username detected'}) 
    }

    const existingStudent = await Student.findOne({username})
    if(!existingStudent) return res.status(401).json({errorMessage: "Student doesn't exist"})

    let getClass = await Classes.findOne({ClassId})
    if(!getClass) return res.status(401).json({errorMessage: "Class doesn't exist"})

    // * Add the course we found to the user course[ObjectID]
    existingStudent.courses.push(getClass)  
    
    await existingStudent.save()
    
    return res.send(existingStudent)
})

// ^ GET request :: Get info about the person we send in the url
router.get('/:username', async(req, res) => {
    try{
        const {username} = req.params

        if(!username){return res.status(401).json({errorMessage: 'No username detected'})}
        
        const existingUser = await Student.findOne({username})
        
        if(!existingUser){return res.status(401).json({errorMessage: "User doesn't exist"})}
        
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

// GO HERE WHEN WE CLICK ON A COURSE LINK
router.get('/courses/:username/:courseId', async(req, res) => {

})

// USE THIS TO GET DATA ABOUT THE USER AND PARSE IT TO A READABLE FORMAT
router.get('/courses/:username', async(req, res) => {
    try{
        const {username} = req.params

        if(!username){return res.status(401).json({errorMessage: 'No username detected'})}
        
        const existingUser = await Student.findOne({username})
        
        if(!existingUser){return res.status(401).json({errorMessage: "User doesn't exist"})}
        
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

// ! LEGACY CODE BELOW

// ! PUT REQUEST TO CHANGE THEIR USERNAME [NOT USED ATM][LEGACY WARNING]
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

module.exports = router