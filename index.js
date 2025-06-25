const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url;

  let filePath = '';
  switch (url) {
    case '/':
      filePath = 'index.html';
      break;
    case '/about':
      filePath = 'about.html';
      break;
    case '/contact-me':
      filePath = 'contact-me.html';
      break;
    case '/404.html':
      filePath = '404.html';
      break;
  }

  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
    } else {
      res.writeHead(
        filePath === '404.html' ? 404 : 200,
        { 'Content-Type': 'text/html' }
      );
      res.end(data);
    }
  });
});

server.listen(8000);