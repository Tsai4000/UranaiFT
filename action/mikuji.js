const MikujiModel = require('../model/mikuji')
const utils = require('../util/util')
const handleError = require('../error/errorHandle')

exports.insertMikuji = (res, fate) => {
  MikujiModel.aggregate([
    { $match: fate ? { fate: fate } : {} },
    { $sample: { size: utils.rand(10) } },
    { $project: { _id: false, __v: false } }
  ]).then(data => {
    const newKuji = Object.fromEntries(Object.entries(data[0]).map(([key, v]) => {
      return [key, data[utils.rand(data.length)][key]]
    }))
    MikujiModel.create(newKuji, (err, ent) => {
      if (err) return res.status(400).send(handleError(err))
      console.log(newKuji)
      res.status(200).json(newKuji)
    })
  }).catch(err => {
    console.log(err)
  })
}

exports.randomMikuji = (res, fate) => {
  MikujiModel.aggregate([
    { $match: fate ? { fate: fate } : {} },
    { $sample: { size: 1 } },
    { $project: { _id: false, __v: false } }
  ]).then(data => {
    if (data.length === 0) return res.status(400).json({ err: 'nodata' })
    console.log(data)
    res.status(200).json(data[0])
  })
}