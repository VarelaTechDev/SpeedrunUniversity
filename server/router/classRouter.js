// > app.use('/courses', require('./router/classRouter'))
const router = require('express').Router()
const Classes = require('../models/classModel')

// ^ GET REQUEST: List all of the classes from the class database
router.get('/list', async(req, res) => {
    try{
        const courses = await Classes.find()
        
        return res.send(courses)

    }catch(err) {res.status(500).send()}
})

module.exports = router