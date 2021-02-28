var mongoose = require('mongoose')

var SampleSchema = new mongoose.Schema({
    lucky: Number,
    wish: Number
})

module.exports = SampleSchema