var express = require('express');
var app = express();

var port = 1314;

app.use('/js', express.static(__dirname + '/js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/data', express.static(__dirname + '/data'));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log('listening on:',  port);
});