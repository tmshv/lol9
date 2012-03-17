var express = require('express');
var port = process.env.PORT;
port = port ? port : 8720;

var app = express.createServer();
app.get('/', function(req, res){
    res.send('lol.cloudno.de');
});
app.listen(port);