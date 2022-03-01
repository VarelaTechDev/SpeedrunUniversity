// > The structure of a Tweet
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const User = require('../models/userModel')

const tweetSchema = new mongoose.Schema({
    message: {type: String},
    userId: {
        type: ObjectId,
        // ? Exactly as the name in const User = .... (THISONE, schema)
        // * tweetRouter populates this
        ref: 'user'
    }
},{
    timestamps: true
})

// ? Place the name tweet[tweets] using the schema 'tweetSchema'
const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet