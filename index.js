var express = require('express');
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

var mongo = require('mongodb').MongoClient
mongo.connect("mongodb://localhost:27017/uranai", function(err, db){
    if (err) throw err
    console.log('connect')
    db.close
})

app.get('/', function(req, res){
    console.log(connection)
});
app.get('/test', function(req, res){
    res.send('test ok')
});

app.listen(port, function(){
    console.log("info",'Server is running at port : ' + port);
});