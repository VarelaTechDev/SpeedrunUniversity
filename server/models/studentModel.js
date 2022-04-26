const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Class = require('../models/classModel')

const studentSchema = new mongoose.Schema({
    name: {type: String, },
    email: {type: String, },
    username: {type: String, },
    profilePicture: {type: String, },
    profileBanner: {type: String, },
    pronouns: {type: String, },
    passwordHash:{type: String, },
    courses: [{
        type: ObjectId,
        ref: 'class'
    }],

    completedSemesterOne: {type: Boolean, default: false},
    completedSemesterTwo: {type: Boolean, default: false},
},
{
    timestamps: true,
})

const Student = mongoose.model('student', studentSchema)

module.exports = Student