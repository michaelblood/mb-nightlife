const TwitterStrategy = require('passport-twitter').Strategy;

const { TWITTER_CONSUMER_ID, TWITTER_CONSUMER_SECRET, CALLBACK_URL } = process.env;
const { Users } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    Users.findById(id, (err, user) => cb(err, user));
  });

  passport.use(new TwitterStrategy({
      consumerKey: TWITTER_CONSUMER_ID,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: CALLBACK_URL
    },
    (acessToken, refreshToken, profile, cb) => {
      Users.findOne({ 'twitter.id': profile.id }, (err, user) => {
        if (err) {
          return cb(err);
        }
        if (user) {
          return cb(null, user);
        }
        Users.create({
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          avatar: profile.photos ? profile.photos[0].value : null
        }, (err, userdoc) => {
          if (err) {
            return cb(err);
          }
          return cb(null, userdoc);
        });
      });
    }  
  ));
};
