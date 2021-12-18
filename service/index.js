const { request } = require('http');

setInterval(function () {
	// simulate random events from the server
	const n = Math.floor(Math.random() * 100);

	if (n % 2 === 0) {
		console.log('Something happened! Sending notification...');
		sendNotification(n);
	}
}, 3000);

function sendNotification(n) {
	const msg = JSON.stringify({ message: n });

	const req = request(
		'http://localhost:3001',
		{
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(msg),
			},
			method: 'POST',
		},
		function (res) {
			let data = [];

			res.on('data', function (chunk) {
				data = data.concat(chunk);
			});

			res.on('end', function () {
				console.log(data.toString());
			});
		}
	);

	req.on('error', function (err) {
		console.error(err);
	});

	req.write(msg);

	req.end();
}

