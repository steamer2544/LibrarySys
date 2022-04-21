var express = require('express');
var router = express.Router();

/* GET user. */
router.get('/', function(req, res, next) {
  res.render('member');
});

module.exports = router;