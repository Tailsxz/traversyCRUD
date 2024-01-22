const mongoose = require('mongoose');

//Setting up a schema for the users of our website, which is essentially a template/blueprint for the data being recieved by Google OAuth which we will be storing into our MongoStore

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    //trim simply trims any whitespace acting like the trim() string method
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    //an enum in programming is just a datastructure that stores a list of constant values. Here we define these constants as 'public', and 'private', and only these two values can be passed to the status property, any other value will produce an error!
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //ref option allows us to replace this specified path in a document with document(s) from other collections, a process called population. Here we ensure that the user property is populated with the associated user from our User schema. This essentially means that when populating, mongoose will check the ObjectId stored in this user property, and replace it with the actual document of the user with that id from our users collection.
    ref: 'user',
  },
    createdAt: {
      type: Date,
      default: Date.now
    },
  // test: String, when a property only requires a type, it can be shorthanded by simply writing out the type after the colon. This shorthands to test: { type: string }!
})

module.exports = mongoose.model('Story', StorySchema);