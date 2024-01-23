// Routes for any requests not being made to the /auth or /stories path.
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

//@desc Show all stories of a user, so we are fetching the stories of the current user and rendering them.
//@route GET /stories

router.get('/', ensureAuth, async (req, res) => {
  try {
    //fetching the stories and calling populate passing in the argument of user, the property we want to populate. This will populate the user property with the actual user document found in the users collection, which now we can access the user.anyProperty within handlebars.
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      //Holy cow! a single uppercased ref: was causing the issue of mongoose not being able to find the schema! uppercase ref BAD
      .sort({ createdAt: -1 })
      .lean();
    res.render('stories/index', { stories });
  } catch (err) {
    console.error(err);
    res.render('errors/500');
  };
});

//@desc Show add story page, which will render the add.hbs body we just created.
//@route GET /stories/add

router.get('/add', ensureAuth, (req, res) => {
  //rendering the handlebars file bringing in the add.hbs file as the body for our main layout.
  res.render('stories/add');
});

//@desc Proccesses the add form
//@route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    //Adding the user property, which is the property that is used to store the ObjectId which is what we are assigning this property to. Which in the story schema we are using to reference the user document in the Users collection. The Story schema we created requires that this id property is an ObjectID and that it matches the current user posting the story.
    req.body.user = req.user.id;
    console.log(req.body);
    await Story.create(req.body);
    // When we use ANY mongoose schema that does not have a collection within our database already, a collection will automatically be created, with the default behavior of undercasing our model name as well as pluralizing it. I.e. User gets transformed to users, Story gets transformed to stories. Cool!
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('errors/500')
  };
});

//@desc Route for showing the edit page upon a user clicking the edit button
//@route GET /stories/edit/:id, using a path parameter of id which we will access to show the appropriate story of the one that was clicked.

router.get('/edit/:id', ensureAuth, async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.id,
  }).lean();

  if (!story) {//if the story with this id is no found, return a 404
    return res.render('errors/404')
  };
  //If the story.user(objectId of user who created the story) is not equal to the current user, redirect them to the main stories page, because only the user who created the story should have access to this page.
  if (story.user != req.user.id) {
    res.redirect('/stories');
  } else {//else we render our edit page.
    res.render('stories/edit', {
      story,
    })
  }
})

//@desc Route to Update(PUT) stories
//@route PUT /stories/:id

router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      res.render('errors/404');
    };

    if (story.user != req.user.id) {
      res.redirect('/stories');
    } else {//findOneAndUpdate takes the arguments of first the filter, we are using _id to filter to the exact document we wish to update, using the path parameter id's value, then the second argument is the update itself in which we pass the req.body, the third is an options object, altering the behavior of our update operation.
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      //setting the new: property to true will enable us to return our document AFTER the update has been applied.
      new: true,
      //when runValidators is set to true, when this update is applied the update validators will be ran, which will validate the document we are adding against the model's schema.
      runValidators: true,
    })

    res.redirect('/dashboard');
  }
  } catch (err) {
    console.error(err);
    return res.render('errors/500');
  }
  
});

//@desc Route for deleting stories
//@route DELETE /stories/:id

router.delete('/:id', ensureAuth, async (req, res) => {
  try {//removed is deprecated, deleteone good :)
    let deleted = await Story.deleteOne({ _id:req.params.id });//Returns a promise which will resolve to a DeleteResults object which has a deletedCount property we can access.
    console.log(deleted.deletedCount);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.render('errors/500');
  };
});



module.exports = router;