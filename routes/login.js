var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
	
  res.render('login', { title: 'Login' });
  // res.send('Login');

});

module.exports = router;