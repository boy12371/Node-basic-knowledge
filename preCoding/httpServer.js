/**
 * Created by yanqin on 2017/10/12.
 */
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);
console.log('请开始你的表演哟')