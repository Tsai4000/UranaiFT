var express = require('express');
var app = express();
var port = 5000;

app.get('/', function(req, res){
    console.log('good')
});
app.get('/test', function(req, res){
    res.send('test ok')
});

app.listen(port, function(){
    console.log("info",'Server is running at port : ' + port);
});