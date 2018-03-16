/**
 * Created by yanqin on 2017/10/12.
 */
var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function(req, res) {
    var post = '';
    req.on('data', function(chunk) {
        post += chunk;
    });
    req.on('end', function() {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
console.log('如果有一个人不爱你，那一个一定不是你的父母')