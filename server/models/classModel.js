const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const classSchema = new mongoose.Schema(
    {
        ClassId: {type: String, },
        Tag: {type: String},
        Name: {type: String, },
        Professor: {type: String, },
        CompletedQuiz: {type: Boolean, },
        Material: {
            chapterOne: {
                completedQuiz: {type: Boolean},
                
                reading: {type: String, },
                
                questionOne: {type: String, },
                answerOne: {type: String, },
                wrongOneAnswer: {type: String, },

                questionTwo: {type: String, },
                answerTwo: {type: String, },
                wrongTwoAnswer: {type: String, },

                questionThree: {type: String, },
                answerThree: {type: String, },
                wrongThreeAnswer: {type: String, },
            }
        },
        Grade: {type: Number, },
    }
)

const Class = mongoose.model('class', classSchema)

module.exports = Class