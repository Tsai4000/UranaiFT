var MikujiSchema = require('./schema/mikuji')
var db = require('../DBConnection')
var MikujiModel = db.model('Mikuji', MikujiSchema)

module.exports = MikujiModel