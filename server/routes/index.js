var express = require('express');
var jwt = require('jsonwebtoken');
var secret = 'this is the secret secret secret 12356';
var expressJwt = require('express-jwt');
var router = express.Router(),
Account = require('./../models/account'),
    passport = require('passport'),
    sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json(401, { error: 'message' });
        }
        // We are sending the profile inside the token
        var token = jwt.sign(user, secret, { expiresIn: 60 * 5 });

        res.json({ token: token });

    })(req, res, next);
});


router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username, email: req.body.email }), req.body.password, function(err, account) {
        if (err) {
            // return res.render('register', { account: account });
            res.send({ success: false, error: err });
        }

        passport.authenticate('local')(req, res, function() {
            res.send({ success: true, message: 'User registered' });
        });
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
