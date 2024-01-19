// Routes for any requests not being made to the /auth or /stories path.
const express = require('express');
const router = express.Router();

//@desc Login/Landing page
//@route GET /
router.get('/', (req, res) => {
  res.render('login', {
    //This is the optional options object, from which we specify to use a layout other than our default which we set within the configs object on the app.engine call.
    layout: 'login',
  });
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
})

module.exports = router