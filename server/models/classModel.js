const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const classSchema = new mongoose.Schema(
    {
        ClassId: {type: String, },
        Name: {type: String, },
        Professor: {type: String, },
        Material: {
            chapterOne: {
                reading: {type: String, },
                
                questionOne: {type: String, },
                answerOne: {type: String, },
                
                questionTwo: {type: String, },
                answerTwo: {type: String, },
                
                questionThree: {type: String, },
                answerThree: {type: String, },
            }
        },
        Grade: {type: String, },
    }
)

const Class = mongoose.model('class', classSchema)

module.exports = Class