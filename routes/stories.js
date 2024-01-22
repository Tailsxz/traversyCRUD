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

//@desc Proccesses the add form
//@route POST /stories
router.get('/', ensureAuth, (req, res) => {
  try {
    //replaces the user property of the body(which has been parsed using the urlencoded body parser) with the id of the current user. The Story schema we created requires that this id property is an ObjectID and that it matches the current user posting the story.
    req.body.user = req.user.id;
    await Story.create
  } catch (err) {
    console.error(err);
    res.render('error/500')
  }
})

module.exports = router