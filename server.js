//var connect = require('connect');
//var app = connect();

//[New Code]
var express = require('express');
var app = express();

//-----------Logs Function--------------
var logger = function(req, res, next) {
	console.log(req.method, req.url);

	next();
};
//-------------------------------------

//-----------Page Function--------------
var home = function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Home| https://expressjs.com/en/guide/routing.html');
	//res.send('Home');
};

var helloWorld = function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
};

var goodbyeWorld = function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Goodbye World');
};
//-------------------------------------

//-----------Router Function--------------
app.use(logger);

app.get('/', home);
app.get('/hello', helloWorld);
app.get('/goodbye', goodbyeWorld);
//---------------------------------------

//-----------Server Function--------------
app.listen(3000);
console.log('Server running at http://localhost:3000');
//---------------------------------------

//-----------Exports Function--------------
module.exports = app;
//-----------------------------------------

/*
var connect = require('connect');
var app = connect();

app.use(function(req, res, next) {
	// middleware
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World');
});


app.listen(3000);
console.log('Server running at http://localhost:3000');
*/



//-----------------------------
/*var http = require('http')
http.createServer(function(req, res){
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.write('Amart\n');
	res.end('Hello World');
}).listen(3000);
console.log('Server running at http://localhost:3000');
*/

