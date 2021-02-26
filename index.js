var express = require('express');
var TestModel = require('./model/model')
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

app.listen(port, function(){
    console.log("info",'Server is running at port : ' + port);
});