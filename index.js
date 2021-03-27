const express = require('express')
const fetch = require('node-fetch')
const TestModel = require('./model/model')
const SampleModel = require('./model/sample')
const MikujiModel = require('./model/mikuji')
const UserModel = require('./model/user')
const RKGKModel = require('./model/RKGKdata')
const utils = require('./util/util')
const mikujiActions = require('./action/mikuji')
const handleError = require('./error/errorHandle')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()

const port = 5000
const hrs = (h) => h * 60 * 60 * 1000 // 1hour
const AIserver = 'http://localhost:5500'
const db = require('./DBConnection')

app.use(bodyParser.json())
app.use(express.urlencoded())
app.set('secret', 'testsecret1')


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

const handleUserToken = (token) => {
  const auths = utils.decode(token).split('-') // 0=>time 1=>username
  console.log(auths)
  if (auths[0] && Date.now() - Number(auths[0]) <= hrs(1)) {
    return utils.encode(Date.now().toString() + '-' + auths[1])
  } else {
    return null
  }
}

app.get('/', (req, res) => {
  console.log(connection)
});
app.get('/test', (req, res) => {
  res.send('test ok')
  const testEntity = new TestModel({ test: 'test1' })
  console.log(testEntity)
});

app.get('/api/mikuji', (req, res) => {
  console.log('random one mikuji')
  return mikujiActions.randomMikuji(res, null)
})

app.post('/api/mikuji', (req, res) => {
  console.log('random one mikuji with Pic')
  // const userInput = req.body.Imgdata
  RKGKModel.create({ data: req.body.imgData, accuracy: 1 }, (err, ent) => {
    if (err) return res.status(400).send(handleError(err))
    // console.log(ent)
  })
  fetch(AIserver + '/predict', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())
    .then(result => utils.judgePredict(result.predict))
    .then(fate => {
      return mikujiActions.randomMikuji(res, fate)
    }).catch(err => {
      return res.status(401).json({ err: err })
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
  UserModel.findOne({ name: req.body.name, password: req.body.password })
    .then(data => {
      if (!data) {
        res.status(401).json({ msg: 'Authenticate failed.' })
      } else {
        const token = jwt.sign(data.toJSON(), app.get('secret'), {
          expiresIn: 60 * 60 * 20
        })
        res.status(200).json({
          msg: 'Login success',
          token: token
        })
      }
    })
    .catch(err => {
      return res.status(500).json({ msg: err })
    })
})

const appAuth = express.Router()

appAuth.use(function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['authorization'].replace('Bearer ', '')
  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ msg: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(401).json({ msg: 'No token provided.' })
  }
})

appAuth.get('/api/insert', (req, res) => {
  console.log('insert GET')
  mikujiActions.insertMikuji(res, null)
})

appAuth.post('/api/insert_AI', (req, res) => {
  console.log('insert POST')
  fetch(AIserver + '/predict', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(result => utils.judgePredict(result.predict))
    .then(fate => {
      mikujiActions.insertMikuji(res, fate)
    }).catch(err => {
      console.log(err)
      return res.status(400).json({ err: err })
    })
})

appAuth.post('/api/insert', (req, res) => {
  console.log(req.body, 'add mikuji')
  if (req.body.mikuji) {
    MikujiModel.create(req.body.mikuji, (err, ent) => {
      if (err) return res.status(400).send(handleError(err))
      console.log(ent)
      res.status(200).send('ok')
    })
  } else {
    res.status(400).send('no mikuji found')
  }
})

app.use('', appAuth)

app.listen(port, () => {
  console.log("info", 'Server is running at port : ' + port);
});