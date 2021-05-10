let mongoose = require('mongoose')

let User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 500
    },
    email: {
        type: String,
        required: true,
        max: 200
    },
    password: {
        type: String,
        required: true,
        max: 20
    },
    phone: {
        type: String,
        required: true,
        max: 13
    }
})

module.exports = mongoose.model('user', User)