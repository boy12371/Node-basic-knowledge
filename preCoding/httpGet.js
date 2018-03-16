/**
 * Created by yanqin on 2017/10/12.
 */
var http = require('http');
http.get({host: 'www.byvoid.com'}, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});