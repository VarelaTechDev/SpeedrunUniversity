const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Class = require('../models/classModel')

const studentSchema = new mongoose.Schema({
    name: {type: String, },
    email: {type: String, },
    username: {type: String, },
    profilePicture: {type: String, },
    ProfileBanner: {type: String, },
    passwordHash:{type: String, },
    semesterOne: 
        {
            classOneId: {
                type: ObjectId,
                ref: 'class'
            },


        classTwoId: {
            type: ObjectId,
            ref: 'class'
        },
    },
    semesterTwo: {
        classOneId: {
            type: ObjectId,
            ref: 'class'
        },
        classTwoId: {
            type: ObjectId,
            ref: 'class'
        },
    }
},
{
    timestamps: true,
})

const Student = mongoose.model('student', studentSchema)

module.exports = Student