var TestSchema = require('./schema/schema')
var db = require('../DBConnection')
var TestModel = db.model('Test', TestSchema)

module.exports = TestModel