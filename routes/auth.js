// Routes for any requests not being made to the /auth or /stories path.
const express = require('express');
const passport = require('passport')
const router = express.Router();

//@desc Authenticating with Google
//@route GET /auth/google
//Here we specify when a GET request is made to this path, we are applying the google strategy(the one we created in the passport.js config file) to authenticate the request, in the options object(second argument) we specify the scope(the data we want) to be the profile.
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@desc Google Auth Callback
//@route GET /auth/google/callback
//This is essentially the redirect upon successful authentication, the second options object defines a failure redirect which will redirect to the root route upon authentication failure, else run the callback which redirects the user to the dashboard path. Upon successful authentication, calling authenticate is what creates the user object on our request!!!!
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/'}), (req, res) => {
  res.redirect('/dashboard');
});

//@desc Logout route, will be hit when the user clicks logout
//@route /auth/logout
router.get('/logout', (req, res, next) => {
  //logout() is a passport primitive! Abstraction goes crazy
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
  // res.redirect('/') <- logout requires we pass a callback now, also changing our get request to a post in order to prevent accidental or malicious logouts. But this requires us to set up additional client side javascript(a fetch) so we will stick to get.
});

module.exports = router