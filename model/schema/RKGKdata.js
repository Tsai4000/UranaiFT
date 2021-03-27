var mongoose = require('mongoose')

var RKGKSchema = new mongoose.Schema({
  data: { type: String, required: true },
  target: { type: Number, required: true }
})

module.exports = RKGKSchema