// create web server
// create a web server that listens for requests on port 3000
// when a request is received, read the file comments.json
// send the contents of the file to the client
// if the file is not found, send a 404 status code

// require http module
var http = require('http');
// require fs module
var fs = require('fs');
// require path module
var path = require('path');

// create server
var server = http.createServer(function (req, res) {
  // if request is a GET request
  if (req.method === 'GET') {
    // if request is for /comments
    if (req.url === '/comments') {
      // get the comments.json file
      fs.readFile(path.join(__dirname, 'comments.json'), function (err, data) {
        if (err) {
          // if file is not found, send 404 status code
          res.writeHead(404);
          res.end();
          return;
        }
        // send the contents of the file to the client
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    } else {
      // if request is not for /comments, send 404 status code
      res.writeHead(404);
      res.end();
    }
  } else {
    // if request is not a GET request, send 404 status code
    res.writeHead(404);
    res.end();
  }
});

// listen for requests on port 3000
server.listen(3000, function () {
  console.log('Server listening on port 3000');
});