var express = require('express');
var router = express.Router();

const { 
  validationResult, 
  check 
} = require('express-validator');

const db = require('monk')('localhost:27017/OnlineLibrary');

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.flash("success", "บันทึกบทความเรียบร้อยแล้ว"); 
  res.render("blog")
});

router.get('/add', function (req, res, next) {
  res.render("addblog")
});

router.post('/add', [
  check("name", "กรุณาป้อนชื่อบทความ").not().isEmpty(),
  check("description", "กรุณาใส่เนื้อหาบทความ").not().isEmpty(),
  check("author", "กรุณาระบุชื่อผู้แต่ง").not().isEmpty()
], function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render("addblog", {errors:errors})
  }
  else {
    //insert to db
    var ct=db.get('blogs');
    ct.insert({
      name: req.body.name,
      description: req.body.description,
      authur: req.body.author
    },function(err,blog){
      if(err){
        res.send(err);
      }
      else{
        req.flash("success", "บันทึกบทความเรียบร้อยแล้ว"); 
        res.location("/blog/add");
        res.redirect("/blog/add");
      }
    })
  }
});
module.exports = router;