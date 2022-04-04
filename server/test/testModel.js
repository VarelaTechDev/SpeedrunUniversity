const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const courseSchema = new mongoose.Schema({
    name: String,
    grade: Number
})

const studentSchema = new mongoose.Schema({
    name: String,
    courses: [courseSchema]
})

const testStudent = mongoose.model('testStudent', studentSchema)

module.exports = testStudent