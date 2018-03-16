var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { ip: req.ip });
});
router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/hello', function(req, res, next) {
    res.send('hello');
});
module.exports = router;
