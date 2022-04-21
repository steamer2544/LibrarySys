const e = require('connect-flash');
var express = require('express');
var router = express.Router();
const {
  validationResult,
  check
} = require('express-validator');
const db = require('monk')('localhost:27017/OnlineLibrary');


/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/', [
  check("email", "กรุณาป้อนอีเมล").not().isEmpty(),
  check("password", "กรุณาป้อนรหัสผ่าน").not().isEmpty(),
], function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render("login", { errors: errors })
  }

  else {
    var ctU = db.get('users');
    var ctA = db.get('admins');
    ctU.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).then((doc) => {
      console.log(doc)
      console.log(doc.length)
      if (doc == 0) {
        //find admin
        ctA.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).then((doc1) => {
          console.log(doc1)
          console.log(doc1.length)
          if (doc1.length > 0) {
            console.log("Find");
            res.location('/dashboard');
            res.redirect('/dashboard');
          }
          else {
            console.log("Not Find");
            res.location('/');
            res.redirect('/');
          }   
        })

      }
      else {
        console.log("Find");
        res.location('/member');
        res.redirect('/member');
      }
    })
     //find admin
    /* ctA.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }).then((doc1) => {
      console.log(doc1)
      console.log(doc1.length)
      if (doc1 == 0) {
        console.log("Not Find");
        //res.location('/');
        //res.redirect('/');
        res.render('login');
      }
      else if (doc1.length > 0) {
        console.log("Find");
        //res.location('/admin');
        //res.redirect('/admin');
        res.render('admin');
      }   
    }) */
  }
});

module.exports = router;
