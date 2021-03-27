var RKGKSchema = require('./schema/RKGKdata')
var db = require('../DBConnection')
var RKGKModel = db.model('RGKdata', RKGKSchema)

module.exports = RKGKModel