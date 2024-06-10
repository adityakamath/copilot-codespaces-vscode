// create simple web server
// run with command: node comments.js
// visit http://localhost:3000/ in your browser

// Require modules
var http = require('http');
var url = require('url');
var qs = require('querystring');
var comments = [];

// Create server
http.createServer(function(req, res) {
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);
    // Get the path
    var path = parsedUrl.pathname;
    // Get the query string as an object
    var query = parsedUrl.query;

    // Handle the request
    if (path == '/add' && req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var comment = qs.parse(body).comment;
            comments.push(comment);
            res.end('Comment added');
        });
    } else if (path == '/comments' && req.method == 'GET') {
        res.end(JSON.stringify(comments));
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}).listen(3000);

console.log('Server running at http://localhost:3000/');
