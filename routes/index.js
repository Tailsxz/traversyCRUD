// Routes for any requests not being made to the /auth or /stories path.
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

//@desc Login/Landing page
//@route GET /
//here for our login page route, we pass in the ensureGuest middleware we created to first check if the user is already authenticated, if so redirect to the dashboard, else we can proceed and call the callback we specified as the third argument. If the ensureGuest middleware redirects, the third callback is ignored, as if they are already authenticated the request is ended with a redirect to dashboard. This allows us when this get request is made to the root route, that we can first check if the user is already authenticated and send them to the dashboard rather than the login page.
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    //This is the optional options object, from which we specify to use a layout other than our default which we set within the configs object on the app.engine call.
    layout: 'login',
  });
})

//@desc Dashboard
//@route GET /dashboard
//Same here, we pass ensureAuth as the callback BEFORE our arrow function callback. We are using this middleware we created to protect the dashboard from being accessed from unauthenticated users.
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    //To be able to input our stories into the handlebars engine, we can call lean() to ensure they are recieved from the database as plain javascript objects, not MongooseDocuments. Therefore when we grab a story from the stories collection in this manner, they are not recieved as a Mongoose Document therefore will not have the functionalities that come with MongooseDocuments, such as the save() method.
    const stories = await Story.find({ user: req.user.id }).lean();
  } catch (error) {
    
  }
  res.render('dashboard', {
    //Here we are passing into handlebars a name which has the value of the current users firstName. The user property comes from passport, anytime the passport.authentication() succeeds, a req.user property is created and assigned to the information of the current user!
    name: req.user.firstName,

  });
})

module.exports = router