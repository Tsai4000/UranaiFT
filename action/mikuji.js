const MikujiModel = require('../model/mikuji')
const utils = require('../util/util')

exports.insertMikuji = (res, fate) => {
  MikujiModel.aggregate([
    { $match: fate ? { fate: fate } : {} },
    { $sample: { size: utils.rand(10) } },
    { $project: { _id: false, __v: false } }
  ]).then(data => {
    // console.log(data)
    const newKuji = Object.fromEntries(Object.entries(data[0]).map(([key, v]) => {
      return [key, data[utils.rand(data.length)][key]]
    }))
    // console.log(newKuji)
    MikujiModel.create(newKuji, (err, ent) => {
      if (err) return res.status(400).send(handleError(err))
      // console.log(ent)
      res.status(200).send('ok')
    })
  }).catch(err => {
    console.log(err)
  })
}