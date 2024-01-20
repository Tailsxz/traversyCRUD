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
    console.log(profile)
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
    }
    try {
      let user = await User.findOne({ googleId: profile.id});

      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }));
  //we are exporting the functions that are serializing the user data storing it into the session, the nextTick queue, is essentially the promise jobs queue which we are identifying by the fact that it is ran before allowing the event loop to continue and that it is executed to completion. Turns out we were wrong about the nextTick queue! It is very similar to the promiseJobs queue, but the main difference is in the priority. The nextTick queue gets priority over the promise jobs queue!
  passport.serializeUser((user, done) => process.nextTick(() => {
      return done(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    })
  );
  //deserializes(grabs information) the information from the user session
  // passport.deserializeUser((id, done) => {
  //   process.nextTick(() => User.findById(id, (err, user) => done(null, user))
  //   );
  // });
  //The code from above doesn't work anymore, mongoose has changed! Now the findById method only takes in an id, no longer accepting a callback to run when it is found, so instead we are checking if the user exists, and if so call the done function, which is being passed in.
  passport.deserializeUser((id, done) => {
    const user = User.findById(id);
    if (user) {
      done(null, user);
    } else {
      throw new Error('User was not found...')
    }
  });
};