var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: String,
    expired: Date,
})

module.exports = UserSchema