var UserSchema = require('./schema/user')
var db = require('../DBConnection')
var UserModel = db.model('User', UserSchema)

module.exports = UserModel