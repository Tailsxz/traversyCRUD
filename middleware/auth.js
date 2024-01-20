module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log('Unauthenticated user tried to access the dashboard');
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