const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const {email, name, username, profilePicture, profileBanner, pronouns, aquaInfo} = require('./studentInfo')

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
        const randomPronoun = Math.floor(Math.random() * pronouns.length)
        const student = new Student({
            name: name[i],
            email: email[i],
            username: username[i],
            profilePicture: profilePicture[0],
            profileBanner: profileBanner[0],
            passwordHash: passwordHash,
            pronouns: pronouns[randomPronoun]
        })

        await student.save()
    }

    // Keqing PFP
    //https://i.pinimg.com/474x/a7/18/0d/a7180d77de9d44f0b3d66fe752e55b24.jpg
    // Create the Aqua PFP
    const salt = await bycrypt.genSaltSync(10)
    const passwordHash = await bycrypt.hashSync(aquaInfo[6], salt)

        const student = new Student({
            name: aquaInfo[0],
            email: aquaInfo[1],
            username: aquaInfo[2],
            pronouns: aquaInfo[3],
            profilePicture: aquaInfo[4],
            // profileBanner: aquaInfo[5],
            profileBanner: profileBanner[0],
            passwordHash: passwordHash,
        })

        await student.save()
    

}


// After we successfully run 'seedDB()' we run .then()
seedDB().then(() => {
    console.log('Seeding complete!')
    mongoose.connection.close()
})