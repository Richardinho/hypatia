let express = require('express');
let app = express();

port = process.env.PORT || 5000;

app.use('/js', express.static(__dirname + '/march/js'));
app.use('/images', express.static(__dirname + '/march/images'));
app.use('/css', express.static(__dirname + '/march/css'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/march/index.html');
});

app.listen(port, function () {
    console.log('listening on:',  port);
});