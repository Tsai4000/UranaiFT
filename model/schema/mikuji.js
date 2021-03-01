var mongoose = require('mongoose')

var MikujiSchema = new mongoose.Schema({
    fortune: String,
    overView: String,
    wish: String,
    wait: String,
    lost: String,
    travel: String,
    bussiness: String,
    knowedge: String,
    arguement: String,
    love: String,
    fate: String,
    house: String,
    sick: String
})

module.exports = MikujiSchema