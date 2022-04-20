const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const {email, name, username, profilePicture} = require('./studentInfo')

const Student = require('../models/studentModel')

mongoose.connect(`mongodb://localhost:27017/sru`, 
    (err) => {
        if(err) 
            return console.log(err)
        console.log('Connected to MongoDB by seeder!')
})

// ? Calling this method will seed our database with info from 'classInfo.js'
const seedDB = async() => {
    // * Empty the database when we run the method
    await Student.deleteMany({})
        
    for(let i = 0; i < name.length; i++){
        const salt = await bycrypt.genSaltSync(10)
        // * Hash the password using bycrypt
        const passwordHash = await bycrypt.hashSync("Password1", salt)
        
        const student = new Student({
            name: name[i],
            email: email[i],
            username: username[i],
            profilePicture: profilePicture[i],
            passwordHash: passwordHash,
        })

        await student.save()
    }
    

}


// After we successfully run 'seedDB()' we run .then()
seedDB().then(() => {
    console.log('Seeding complete!')
    mongoose.connection.close()
})