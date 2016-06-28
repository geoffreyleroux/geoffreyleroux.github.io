// Load the Connect module
var connect = require('connect');
var logger = require('morgan');
var compress = require('compression');
var directory = require('serve-static');
var favicon = require('serve-favicon');
var timeout = require('connect-timeout');
var proxy = require('./proxy.js');
var fs = require('fs');

// Create a Connect app
var app = connect();
var root = __dirname + '/public';

// Configure the app
app.use(logger("combined")); // Logs HTTP/HTTPS requests

app.use(directory(root, {
    maxAge:'31536000',
    setHeaders:function(res, path) {
        if (directory.mime.lookup(path) === 'text/html') {
            res.setHeader('Cache-Control', 'public, max-age=0')
        }}}));

app.use(compress()); // Compress all responses using Gzip

app.use(timeout(20000)); // Set maximum time to complete a request to 20 seconds (20000 ms)

app.use('/webclient', function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream(root + '/index.html').pipe(res);});

// Listen for HTTP/HTTPS connections
var ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 9001;
app.listen(port, ip);

console.log('Server running on ' + ip + ':' + port);

