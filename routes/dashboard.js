var express = require('express');
var router = express.Router();

/* GET admin. */
router.get('/', function (req, res, next) {
 
  res.render('dashboard', { amount: 'dark' });
  
  
});

/*router.post('/', function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  var ctB = db.get('books');




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
  }
}); */



module.exports = router;
