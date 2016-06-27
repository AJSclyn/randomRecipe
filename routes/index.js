var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signIn', function(req, res){
  res.render('signIn', { title: 'Sign-Up' });
});

module.exports = router;
