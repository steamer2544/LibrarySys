var express = require('express');
var router = express.Router();
const {
    validationResult,
    check
} = require('express-validator');
const db = require('monk')('localhost:27017/OnlineLibrary');

/* GET register page. */
router.get('/', function (req, res, next) {
    req.flash("success", "บันทึกข้อมูลเรียบร้อยแล้ว");
    res.render("register")
});

router.post('/', [
    check("firstname", "กรุณาป้อนชื่อ").not().isEmpty(),
    check("lastname", "กรุณาป้อนนามสกุล").not().isEmpty(),
    check("studentID", "กรุณาป้อนรหัสนักศึกษา").not().isEmpty(),
    check("email", "กรุณาป้อนอีเมล").not().isEmpty(),
    check("password", "กรุณาป้อนรหัสผ่าน").not().isEmpty()
], function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render("register", { errors: errors })
    }

    else {
        var ct = db.get('users');
        ct.find({$or:[{studentID:req.body.studentID}, {email:req.body.email}]}).then((doc) => {
        console.log(doc)
        console.log(doc.length)
        if(doc == 0){
          console.log("Not Find");
          ct.insert({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            studentID:req.body.studentID,
            email:req.body.email,
            password:req.body.password
        });
        res.location('/');
        res.redirect('/');
      } else {
          console.log("Find");
          res.location('/register');
          res.redirect('/register');	
            }
        })
    }
});
module.exports = router;