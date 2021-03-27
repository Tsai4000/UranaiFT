var mongoose = require('mongoose')

var RKGKSchema = new mongoose.Schema({
  data: { type: String, required: true },
  accuracy: { type: Number, required: true }
})

module.exports = RKGKSchema