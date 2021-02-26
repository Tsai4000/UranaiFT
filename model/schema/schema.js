var mongoose = require('mongoose')

var TestSchema = new mongoose.Schema({
    test: String
})

module.exports = TestSchema