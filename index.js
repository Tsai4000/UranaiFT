const express = require('express');
const TestModel = require('./model/model')
const SampleModel = require('./model/sample')
const MikujiModel = require('./model/mikuji');
const bodyParser = require('body-parser')
const db = require('./DBConnection');
const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());


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

app.get('/', function(req, res){
    console.log(connection)
});
app.get('/test', function(req, res){
    res.send('test ok')
    const testEntity = new TestModel({test: 'test1'})
    console.log(testEntity)
});

app.get('/insert', function(req, res){
    console.log(req.path, 'call insert')
    SampleModel.create({
        lucky: Math.floor(Math.random()*100),
        wish: Math.floor(Math.random()*100)
    }, function(err, ent){
        if(err) console.log(err)
        console.log(ent, 'inside')
    })
    const sampleCollection = db.collection('samples')
    sampleCollection.find({__v: 0}).toArray(function(err, result){
        if (err) throw(err)
        res.send(result)
    })
})

app.post('/mikuji', function(req, res){
    console.log(req.body, 'add mikuji')
    if(req.body.mikuji){
        MikujiModel.create(req.body.mikuji, function(err, ent){
            if(err) res.status(400).send(err.details[0].message)
            console.log(ent)
            res.status(200).send('ok')
        })
    }else{
        res.status(400).send('no mikuji found')
    }
})

app.get('/hiku', function(req, res){
    
})

app.listen(port, function(){
    console.log("info",'Server is running at port : ' + port);
});