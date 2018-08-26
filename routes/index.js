var express = require('express');
var nodeMailer = require('nodemailer');
var config = require('../config');

var transporter = nodeMailer.createTransport(config.mailer);

var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TogetherCode' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: "TogetherCode" });
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: "TogetherCode" });
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('message', 'Messages is required').notEmpty();
    var body = req.body;
    var errors = req.validationErrors();
    if(errors){
      res.render('contact', {
        title: "TogetherCode",
        name: body.name,
        email: body.email,
        message: body.message,
        errors_mes: errors
      });
    }else{
      var mailerOptions = {
        to: body.email,
        from: 'quangvv7500@gmail.com',
        subject: 'You have got a messages to visitor',
        text: body.message
      }

      transporter.sendMail(mailerOptions, function(error, info) {
        if(error){
          return console.log(error);
        }
        res.render('thank', { title: "TogetherCode" });
      });
    }
  });

module.exports = router;
