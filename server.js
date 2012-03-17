var fs = require('fs');
var express = require('express');
var port = process.env.PORT;
port = port ? port : 8720;

var app = express.createServer();
app.get('/', function(req, res){
    res.send('lol.cloudno.de');
});
app.get('/mandelbrot', function(req, res){
    fs.readFile('mandelbrot.png', function(error, data){
        if(error){
            res.send(error.toString());   
        }else{
            res.send(data);
        }
    });
});
app.listen(port);