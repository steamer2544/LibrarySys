const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


const User = require('../model/user');

router.post('/register', async (req, res) => {
  const { username, password, firstname, lastName, studentID } = req.body;

  // simple validation
  if (!firstname || !lastname || !studentID
    || !email || !password) {
    return res.render('register', { message: 'Please try again' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    firstName,
    lastName,
    studentID,
    email,
    username,
    password: passwordHash
  });

  await user.save();
  res.render('index', { user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.render('register', { message: 'Please try again' });
  }

  const user = await User.findOne({
    email
  });

  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password);

    if (isCorrect) {
      return res.render('dashbaord', { user });
    } else {
      return res.render('login', { message: 'Username or Password incorrect' });
    }
  } else {
    return res.render('login', { message: 'Username does not exist.' });
  }
});

module.exports = router;