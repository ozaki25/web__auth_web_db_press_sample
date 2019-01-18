const https = require('https');
const fs = require('fs');

const ssl_key = 'server_key.pem';
const ssl_cert = 'server_cert.pem';
const port = 4433;

const options = {
  key: fs.readFileSync(ssl_key),
  cert: fs.readFileSync(ssl_cert),
};

https.createServer(options, function(request, response) {
  if (request.url == '/index.html' || request.url == '/') {
    const file = 'index.html';
    fs.readFile(file, function(error, data) {
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else {
    response.writeHeader(404, { 'Content-Type': 'text/html' });
    response.end('Not Found');
  }
}).listen(port);

