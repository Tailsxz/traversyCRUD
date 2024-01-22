const mongoose = require('mongoose');

//Setting up a schema for the users of our website, which is essentially a template/blueprint for the data being recieved by Google OAuth which we will be storing into our MongoStore

const UserSchema = new mongoose.Schema({
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
    ref: 'User',
    //Changed this to not required, not all google users have a lastName, if google doesn't require it, we shouldn't either.
  },
  image: {
    type: String,
    createdAt: {
      type: Date,
      default: Date.createdAt
    }
  },
})

module.exports = mongoose.model('user', UserSchema);