const mongoose = require('mongoose');

//Setting up a schema for the users of our website, which is essentially a template/blueprint for the data being recieved by Google OAuth which we will be storing into our MongoStore

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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