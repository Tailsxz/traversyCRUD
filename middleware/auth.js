module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log('Unauthenticated user tried to access the dashboard/stories');
      res.redirect('/');
    };
  },
  ensureGuest: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('Authenticated user has an active session');
      res.redirect('/dashboard');
    } else {
      return next();
    };
  }
}
// Both of these are to protect our routes, the first will be called upon hitting the /dashboard route, if an unauthenticated user tries to go there without logging in, they will be redirected to the login page, the second does the opposite, if an authenticated user hits our root route, '/', the user will be redirected to the dashboard, as a user with an active session shouldn't ever see the login page.