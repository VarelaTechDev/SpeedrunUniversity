// > Where exactly our Tweets will be sent and how they will be handled by the server
const router = require('express').Router()

// ? Import our Database model for Tweet
const Tweet = require('../models/tweetModel')

// ? Middleware to verify the cookies were made from our server
const auth = require('../middleware/auth')

// ^ GET request :: Gives a json object with all the Tweets
router.get('/', async(req, res) => {
    try{
        // * Populate the user of tweetModel with the userModel
        // ? path: Pick the place where the Foreign_Key is located in the model
        // ? What do we want to populate into that Foreign_Key?
        const tweets = await Tweet.find().populate({path: 'userId', select: ['username', 'profilePicture']})
        // ^ Go here to determine what gets populated!
        res.json(tweets)
    }
    catch(err){
        res.status(500).send()
    }
})

// ^ POST request :: Sends a json format to our database
router.post('/', auth, async(req, res) => {
    try{
        // * auth middleware is runned first to see if the user is logged in
        // ? The middleware will look to see if they are logged in
        
        // * Destructure what we send
        const {message} = req.body

        // * No message will prevent you
        if(!message){
            return res.status(400).json({
                errorMessage: 'You need to enter a body'
            })
        }

        // * Place the propert values into the tweetModel
        const newTweet = new Tweet({
            message,
            userId: req.user, // ? The user _id is placed here :: Placed by the auth middleware
        })

        // * Place the Tweet in the database
        const savedTweet = await newTweet.save()        
        
        // * Gives us a json response of the Tweet
        // username
        // message
        // userId <-- The user id that is needed to populate it -- [FP]
        // _id <--- The id of the [PK]
        // createdAt
        // updatedAt
        res.json(savedTweet)


    }catch(err){
        res.status(500).send()
    }
})

// ^ DELETE request :: Deletes the Tweet that has that TweetID
router.delete('/:id', auth, async(req, res) => {
    // ? auth middleware: checks to see if the user has barbter_cookie 
    try{
        // * Get the TweetID 
        const tweetId = req.params.id

        // * If an id is not present in req.params
        if(!tweetId){
            return res.status(400).json({
                errorMessage: 'Tweet ID not in the database'
            })
        }
        
        // * Now find a Tweet with that tweetId
        const existingTweet = await Tweet.findById(tweetId)

        // * If the id is not in the database; Then that Tweet doesn't exist
        if(!existingTweet){
            return res.status(400).json({
                errorMessage: 'Tweet ID with this ID is not in the database'
            })
        }

        // * Makes sure the Tweet belongs to the user that's logged in
        if(existingTweet.userId.toString() !== req.user){
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            })
        }
        
        // * Delete the Tweet
        await existingTweet.delete()

        // * Show us what Tweet was deleted
        res.json(existingTweet)

    }catch(err){
        res.status(500).send()
    }
})

router.delete('/:id/potus', async(req, res) => {
    try{
        // * Get the TweetID 
        const tweetId = req.params.id

        // * If an id is not present in req.params
        if(!tweetId){
            return res.status(400).json({
                errorMessage: 'Tweet ID not in the database'
            })
        }

        const existingTweet = await Tweet.findById(tweetId)

        // * If the id is not in the database; Then that Tweet doesn't exist
        if(!existingTweet){
            return res.status(400).json({
                errorMessage: 'Tweet ID with this ID is not in the database'
            })
        }

        // * Delete the Tweet
        await existingTweet.delete()

        // * Show us what Tweet was deleted
        res.json(existingTweet)

    }
    catch(err){
        res.status(500).send()
    }
})

module.exports = router