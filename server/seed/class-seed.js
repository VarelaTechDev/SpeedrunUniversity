const mongoose = require('mongoose')
const {id, tags, name, professor, intro, material} = require('./classInfo')

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

    const tagArray = [0,1,2,3,0,0,1,4,5]
    let materialCounter = 0;

    for(let i = 0; i < id.length; i++){


        const dynamicCourse = new Class({
            ClassId: id[i],
            Tag: tags[tagArray[i]],
            // Tag: tags[0],
            Name: name[i],
            Professor: professor[Math.floor(Math.random()*professor.length)],
            CompletedQuiz: false,
            OwnedByStudent: false,
            ClassIntro: intro[i],
            Material:{
                chapterOne: {
                    reading: material[materialCounter++],
                    
                    questionOne: material[materialCounter][0],
                    answerOne: material[materialCounter][1],
                    wrongOneAnswer: material[materialCounter++][2],

                    questionTwo: material[materialCounter][0],
                    answerTwo: material[materialCounter][1],
                    wrongTwoAnswer: material[materialCounter++][2],

                    questionThree: material[materialCounter][0],
                    answerThree: material[materialCounter][1],
                    wrongThreeAnswer: material[materialCounter++][2],
                }
            },
            Grade: 0,
        })
        await dynamicCourse.save()
    }
    
    // const introToJava = new Class({
    //     ClassId: id[0],
    //     Tag: tags[0],
    //     Name: name[0],
    //     Professor: professor[Math.floor(Math.random()*professor.length)],
    //     CompletedQuiz: false,
    //     ClassIntro: intro[0],
    //     Material: {
    //         chapterOne: {
    //             reading: material[0],
                
    //             questionOne: material[1][0],
    //             answerOne: material[1][1],
    //             wrongOneAnswer: material[1][2],

    //             questionTwo: material[2][0],
    //             answerTwo: material[2][1],
    //             wrongTwoAnswer: material[2][2],

    //             questionThree: material[3][0],
    //             answerThree: material[3][1],
    //             wrongThreeAnswer: material[3][2],
    //         }
    //     },
    //     Grade: 0,
    // })
    
    
    
    // await introToJava.save()
    

}

// After we successfully run 'seedDB()' we run .then()
seedDB().then(() => {
    console.log('Seeding complete!')
    mongoose.connection.close()
})