let express = require('express');
let app = express();

let port = 5000;

app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/data', express.static(__dirname + '/data'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log('listening on:',  port);
});