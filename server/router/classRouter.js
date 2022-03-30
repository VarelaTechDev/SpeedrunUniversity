// ? Import our database for our Classes
const Classes = require('../models/classModel')
const router = require('./tweetRouter')

router.get('/list', async(req, res) => {
    try{
        //const courses = {...await Classes.find()}
        const courses = await Classes.find()
        return res.send(courses)

    }catch(err){
        res.status(500).send()
    }
})




module.exports = router