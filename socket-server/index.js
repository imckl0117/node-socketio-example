const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.post('/', function (req, res) {
	const msg = req.body;

	io.emit('notification', msg);

	const response = {
		status: 200,
		message: 'OK',
	};

	res.status(response.status).json(response);
});

io.on('connection', function (socket) {
	console.log('A connection established...');

	socket.on('disconnect', function () {
		console.log('A connection dropped...');
	});
});

server.listen(3001, function () {
	console.log('socket-server is listening on *:3001');
});

