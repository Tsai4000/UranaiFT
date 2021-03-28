var mongo = require('mongoose')

mongo.connect("mongodb://localhost:27017/uranai")

var db = mongo.connection
db.on('error', console.log.bind(console, 'Error: '))
db.once('open', function (callback) {
  console.log('db connected')
})

module.exports = db