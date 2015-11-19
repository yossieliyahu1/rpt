
var express = require('express');
var app = new express();

var parser = require('body-parser');

require('./database.js');


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static(__dirname + '/../.tmp'));
app.use(express.static(__dirname + '/imgs'));
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));




app.listen(7777);
console.log("server is listening on port 7777");

// manage API routes (set, get, update)
require('./routes.js')(app);