'use strict';

var request = require('request');

function Proxy(targetUrl, proxy, cache) {
    this.useProxy = proxy;
    this.useCache = cache;
    this.url = targetUrl;
    this.cache = {};
}

Proxy.prototype.store = function(req, body) {
    var url = this.url + req.url;
    if (req.headers['accept-language']) url  = url + "?lang=" + req.headers['accept-language'];
    console.log("adding response for " + url + " to cache");
    this.cache[url] = body;
};

Proxy.prototype.find = function(req) {
    var url = this.url + req.url;
    if (req.headers['accept-language']) url  = url + "?lang=" + req.headers['accept-language'];
    return this.cache[url];
};

Proxy.prototype.handle = function (req, res, next) {
    console.log("request url " + req.url);
    
    if (req.url == '/clearcache') {
        this.cache = {};
        console.log("cache dumped");
        res.end("cache dumped");
    } else {        
        var url = this.url + req.url;

        var cached = this.find(req);
        if (cached && req.method == 'GET') {
            console.log("serving from cache for " + url);
            res.end(cached);
        } else {

            var options = {method: req.method, uri: url, timeout: 30 * 1000, gzip: false};


            if (this.useProxy) {
                if (!process.env.STATICA_STATICA_URL) console.log("error STATICA_STATICA_URL not set. Request will not use static ip");
                else options.proxy = process.env.STATICA_STATICA_URL;
            }

            console.log("proxying " + req.originalUrl + " to " + JSON.stringify(options));

            var self = this;
            req.pipe(request(options)).pipe(res);
        }
    }
};


module.exports = Proxy;
