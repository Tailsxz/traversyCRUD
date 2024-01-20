const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },//the name for the last argument "done", is arbitrary and can be named anything, it is the callback function passport.js passes in for us to call and pass the user back to passport upon successful auth.
  async (accessToken, refreshToken, profile, done) => {
    //Creating a newUser object to be able to store them into our database if they didn't exist, in the format defined within the User schema.
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    }
    try {//First we try to find a user with the googleId property that matches the current profile for this verfiy callback function call.
      let user = await User.findOne({ googleId: profile.id});
      //if they exist, we call done() non native passport cb to pass in the user to be stored in the session.
      if (user) {
        done(null, user);
      } else {//if they do not exist, we store them into the database then call the non native passport cb.
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }));
  //we are exporting the functions that are serializing the user data storing it into the session, the nextTick queue, is essentially the promise jobs queue which we are identifying by the fact that it is ran before allowing the event loop to continue and that it is executed to completion. Turns out we were wrong about the nextTick queue! It is very similar to the promiseJobs queue, but the main difference is in the priority. The nextTick queue gets priority over the promise jobs queue!
  passport.serializeUser((user, done) => process.nextTick(() => {
    //specifying we only want to store the id,username and picture of the user into the session store.
      // return done(null, {
      //   id: user.id,
      //   username: user.username,
      //   picture: user.picture
      // }); No clue what happened, but now it is storing only the id and we can access it by stating the parameter of id without the need for destructuring.
    return done(null, user.id);
    })
  );
  //deserializes(grabs information) the information from the user session
  // passport.deserializeUser((id, done) => {
  //   process.nextTick(() => User.findById(id, (err, user) => done(null, user))
  //   );
  // });
  //The code from above doesn't work anymore, mongoose has changed! Now the findById method only takes in an id, no longer accepting a callback to run when it is found, so instead we are checking if the user exists, and if so call the done function, which is being passed in.
  //Oh my that was a pain to debug. So our previous solution of just storing the User.findById(id) call wasn't working because the "id" parameter being passed in was really the user itself which had a property of id..... which now with this refactored solution we are accessing the id property of the user object passed into the deserialize function. If we wanted to use and directly access the id of the user object being passed in we could destructure. Actually lets comment this one out and do that.
  // passport.deserializeUser(async (user, done) => {
  //   //rather than deserializing from the session store, we are doing so from the MongoDB collection users.
  //   const currentUser = await User.findById(user.id);
  //   if (currentUser) {
  //     done(null, currentUser);
  //   } else {
  //     throw new Error('User was not found...')
  //   }
  // });
  //Since our serializeUser function is serializing a whole user object along with a couple properties, we can destructure to only recieve the id property to then query our database with. Now only the parameter name is actually referencing the key rather than being passed the { id: id} object.
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (user) {
      //this is the function that is storing our user data into the req.user property.
      return done(null, user);
    }
  });
  //There ya go! Much cleaner :)
};

// {"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":{"id":"65ac2a3338fe4f7a6b4f5b2a"}}}
// {"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":"65ac2bf3a8e390f6484bb012"}}
//Here was the main issue, whatever code i wrote before stored the id as an object, which then i cleared that cookie and on the next login it stored it appropriately. 