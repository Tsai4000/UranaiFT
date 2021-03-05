var SampleSchema = require('./schema/sample')
var db = require('../DBConnection')
var SampleModel = db.model('Sample', SampleSchema)

module.exports = SampleModel