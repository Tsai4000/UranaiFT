const express = require('express')
const fetch = require('node-fetch')
const TestModel = require('./model/model')
const SampleModel = require('./model/sample')
const MikujiModel = require('./model/mikuji')
const UserModel = require('./model/user')
const handleError = require('./error/errorHandle')
const bodyParser = require('body-parser')
const db = require('./DBConnection')
const utils = require('./util/util')
const mikujiActions = require('./action/mikuji')
const port = 5000;
const app = express()
const hrs = 1 // 1hour
const AIserver = 'http://localhost:5500'
app.use(bodyParser.json())
app.use(express.urlencoded())


// var sql = require('mysql')
// var config = {
//     user: 'root',
//     password: 'root123',
//     database: '',
//     server: 'localhost'
// }
// var connection = new sql.createConnection(config, function(err){
//     if (!err){
//         console.log('connect')
//     }else{
//         console.log(err)
//     }
// })
// connection.connect(function(err){
//     console.log(err)
// })

app.get('/', (req, res) => {
  console.log(connection)
});
app.get('/test', (req, res) => {
  res.send('test ok')
  const testEntity = new TestModel({ test: 'test1' })
  console.log(testEntity)
});

app.get('/api/insert', (req, res) => {
  console.log('insert GET')
  mikujiActions.insertMikuji(res, null)
})

app.post('/api/insert_AI', (req, res) => {
  console.log('insert POST')
  fetch(AIserver + '/predict', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(result => {
      const predict = result.predict
      // console.log(result)
      return utils.judgePredict(predict)
    }).then(fate => {
      mikujiActions.insertMikuji(res, fate)
    }).catch(err => {
      console.log(err)
      return res.status(400).json({ err: err })
    })
})

app.post('/api/insert', (req, res) => {
  console.log(req.body, 'add mikuji')
  if (req.body.mikuji) {
    MikujiModel.create(req.body.mikuji, function (err, ent) {
      if (err) return res.status(400).send(handleError(err))
      console.log(ent)
      res.status(200).send('ok')
    })
  } else {
    res.status(400).send('no mikuji found')
  }
})

app.get('/api/hiku', (req, res) => {
  console.log('random one mikuji')
  db.collection('mikujis').aggregate([
    { $sample: { size: 1 } },
    { $project: { _id: false, __v: false } }
  ]).toArray(function (err, data) {
    if (err) return res.status(400).send(err.details[0].message)
    console.log(data)
    res.status(200).json(data[0])
  })
})

app.post('/api/user', (req, res) => {
  console.log('create user')
  // const isexist = db.collection('user').find({ name: req.body.name })
  UserModel.find({ name: req.body.name })
    .then(data => {
      if (data.length !== 0) {
        console.log('User already exist')
        return res.status(401).json({ errmsg: 'User already exist' })
      } else {
        UserModel.create(req.body).then(() => {
          return res.status(200).json({ msg: "User created" })
        })
      }
    })
    .catch(err => {
      return res.status(500).json({ errmsg: err })
    })
})

app.post('/api/login', (req, res) => {
  console.log('login')
  UserModel.find({ name: req.body.name, password: req.body.password })
    .then(data => {
      if (data.length === 0) {
        console.log('Login failed')
        return res.status(401).json({ errmsg: 'Login failed' })
      } else {
        const nowTime = Date.now()
        const combine = Buffer.from(nowTime.toString().concat(data[0].name))
        const token = combine.toString('base64')
        console.log(`now: ${nowTime}, token: ${token}`)
        UserModel.updateOne(
          { name: req.body.name, password: req.body.password },
          {
            $set: { token: token, expired: nowTime + (hrs * 60 * 60 * 1000) }
          }).then(() => {
            return res.status(200).json({ token: token })
          })
      }
    })
    .catch(err => {
      return res.status(500).json({ errmsg: err })
    })
})

app.get('/api/redirect', (req, res) => {
  console.log('redirect')
  fetch(AIserver + '/test')
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      res.status(200).json(data)
    }).catch(err => {
      console.log('err', err)
      res.status(400).json({ err: err.code })
    })
})

app.listen(port, function () {
  console.log("info", 'Server is running at port : ' + port);
});