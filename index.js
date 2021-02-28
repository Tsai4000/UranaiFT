var express = require('express');
var TestModel = require('./model/model')
var SampleModel = require('./model/sample')
var db = require('./DBConnection')
var app = express();
var port = 5000;

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
    var testEntity = new TestModel({test: 'test1'})
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
    var sampleCollection = db.collection('samples')
    sampleCollection.find({__v: 0}).toArray(function(err, result){
        if (err) throw(err)
        res.send(result)
    })
})

app.get('/hiku', function(req, res){
    
})

app.listen(port, function(){
    console.log("info",'Server is running at port : ' + port);
});