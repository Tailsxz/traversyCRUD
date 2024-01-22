// Routes for any requests not being made to the /auth or /stories path.
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

//@desc Show add story page, which will render the add.hbs body we just created.
//@route GET /stories/add

router.get('/add', ensureAuth, (req, res) => {
  //rendering the handlebars file bringing in the add.hbs file as the body for our main layout.
  res.render('stories/add');
})

module.exports = router