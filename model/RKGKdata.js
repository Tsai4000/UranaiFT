var RKGKSchema = require('./schema/RKGKdata')
var db = require('../DBConnection')
var RKGKModel = db.model('RKGKdata', RKGKSchema)

module.exports = RKGKModel