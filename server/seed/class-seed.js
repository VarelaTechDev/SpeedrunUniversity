const mongoose = require('mongoose')
const {id, name, professor, material, intro, tags, synopsis} = require('./classInfo')

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
        
    // Learning Java with Projects
    const programmingClass = new Class({
        ClassId: id[0],
        Tag: tags[0],
        Name: name[0],
        Professor: professor[0],
        CompletedQuiz: false,
        Synopsis: synopsis[0],
        ClassIntro: intro[0],
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
        Grade: 0,
    })
    
    // Calculus I
    const mathClass = new Class({
        ClassId: id[1],
        Tag: tags[1],
        Name: name[1],
        Professor: professor[1],
        CompletedQuiz: false,
        Synopsis: synopsis[1],
        ClassIntro: intro[1],
        Material: {
            chapterOne: {
                completedQuiz: false,
                reading: material[4],

                questionOne: material[5][0],
                answerOne: material[5][1],

                questionTwo: material[6][0],
                answerTwo: material[6][1],

                questionThree: material[7][0],
                answerThree: material[7][1],
            }
        },
        Grade: 0,
    })

    // Art 101
    const artClass = new Class({
        ClassId: id[2],
        Tag: tags[2],
        Name: name[2],
        Professor: professor[2],
        CompletedQuiz: false,
        Synopsis: synopsis[2],
        ClassIntro: intro[2],
        Material: {
            chapterOne: {
                completedQuiz: false,
                reading: material[8],

                questionOne: material[9][0],
                answerOne: material[9][1],

                questionTwo: material[10][0],
                answerTwo: material[10][1],

                questionThree: material[11][0],
                answerThree: material[11][1],
            }
        },
        Grade: 0,
    })

    await programmingClass.save()
    await mathClass.save()
    await artClass.save()

}

// After we successfully run 'seedDB()' we run .then()
seedDB().then(() => {
    console.log('Seeding complete!')
    mongoose.connection.close()
})