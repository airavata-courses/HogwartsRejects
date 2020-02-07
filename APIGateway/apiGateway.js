const http = require('http');

const hostname = '192.168.43.31';
const port = 5000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/plain');
  	res.end('Sysmon App is Up and Running!\n');
});

server.listen(port, hostname, () => {
  	console.log(`Server running at http://${hostname}:${port}/`);
});

