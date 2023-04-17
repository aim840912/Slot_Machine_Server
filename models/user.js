const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    account: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    },
    money: {
        type: Number,
        required: true,
        default: 10000
    }
})

module.exports = mongoose.model('User', userSchema)