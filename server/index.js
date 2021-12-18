const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function () {
	console.log('server is listening on *:3000');
});

