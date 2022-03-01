// > Simple user model that just requires an email and password
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        profileBanner: {
            type: String
        },
        profilePicture: {
            type: String
        },
        passwordHash: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
// ? user is what we use to reference in different schema
const User = mongoose.model('user', userSchema)

module.exports = User