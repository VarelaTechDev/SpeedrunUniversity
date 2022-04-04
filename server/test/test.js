const router = require('express').Router()

const testStudent = require('./testModel')

router.post('/register', async(req, res) => {
    // ! req.body means we are reading the json form
    // ! req.params uses the link
    const{name} = req.body

    const existingName = await testStudent.findOne({name})
    
    if(existingName) return res.status(400).json({errorMessage: 'A student already exists'})
    

    const newStudent = new testStudent({
        name: name
    })

    const savedStudent = await newStudent.save()

    res.send(savedStudent)
})

router.get('/list', async(req, res) => {
    const response = await testStudent.find()
    res.send(response)
})

router.put('/addCourse', async(req, res) => {
    const {name, courseName} = req.body

    const student = await testStudent.findOne({name})

    student.save().then(function(){
        testStudent.findOne({name}).then(function(record){
            record.courses.push({name:`${courseName}`})
            record.save()
        })
    })

    


})

module.exports = router