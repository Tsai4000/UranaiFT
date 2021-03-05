var mongoose = require('mongoose')

var MikujiSchema = new mongoose.Schema({
    fortune: { type: String, required: true },
    overView: { type: String, required: true },
    wish: { type:String, required: true },
    wait: { type: String, required: true },
    lost: { type: String, required: true },
    travel: { type: String, required: true },
    bussiness: { type: String, required: true },
    knowedge: { type: String, required: true },
    arguement: { type: String, required: true },
    love: { type: String, required: true },
    fate: { type: String, required: true },
    house: { type: String, required: true },
    sick: { type: String, required: true }
})

module.exports = MikujiSchema