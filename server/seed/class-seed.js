const mongoose = require('mongoose')
const {id, name, professor, material} = require('./classInfo')

const Class = require('../models/classModel')

mongoose.connect(`mongodb://localhost:27017/sru`, 
    (err) => {
        if(err) 
            return console.log(err)
        console.log('Connected to MongoDB by seeder!')
})

// ? Calling this method will seed our database with info from 'classInfo.js'
const seedDB = async() => {
    // * Empty the database when we run the method
    await Class.deleteMany({})
        
    const programmingClass = new Class({
        ClassId: id[0],
        Name: name[0],
        Professor: professor[0],
        Material: {
            chapterOne: {
                reading: material[0],
                
                questionOne: material[1][0],
                answerOne: material[1][1],

                questionTwo: material[2][0],
                answerTwo: material[2][1],

                questionThree: material[3][0],
                answerThree: material[3][1],
            }
        },
        Grade: '',
    })
    
    const mathClass = new Class({
        ClassId: id[1],
        Name: name[1],
        Professor: professor[1],
        Material: {
            chapterOne: {
                reading: material[4],

                questionOne: material[5][0],
                answerOne: material[5][1],

                questionTwo: material[6][0],
                answerTwo: material[6][1],

                questionThree: material[7][0],
                answerThree: material[7][1],
            }
        },
        Grade: '',
    })

    await programmingClass.save()
    await mathClass.save()

}

// After we successfully run 'seedDB()' we run .then()
seedDB().then(() => {
    console.log('Seeding complete!')
    mongoose.connection.close()
})