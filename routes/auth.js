var express = require('express');
var router = express.Router();
var passport = require('passport');


router.route('/register')
  .get(function(req, res, next) {
    res.render('register', { title: 'Register Account' });
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Empty name').notEmpty();
    req.checkBody('password', 'password not do match').equals(req.body.confirmPassword).notEmpty();
    var body = req.body;
    errors = req.validationErrors();
    if(errors){
      res.render('register', {
        name: body.name,
        email: body.email,
        errorsMes: errors
      })
    }else{
      var user = new User();
      user.name = body.name;
      user.email = body.email;
      user.setPassword(body.email);
      user.save(function(err) {
        if(err){
          res.render('register', {errorsMes: err});
        }else{
          res.redirect('/login');
        }
      })
    }
  });

router.route('/login')
  .get(function(req, res, next) {
    res.render('login', { title: "Login" });
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });

module.exports = router;