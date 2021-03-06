const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model('users');


passport.serializeUser( (user,done) => {
    done(null,user.id);
})

passport.deserializeUser( (id, done) => {
    Users.findById(id).then( user => {
        done(null ,user);
    });
});

passport.use(new GoogleStrategy(
    {
    clientID : keys.googleClienID,
    clientSecret : keys.googleClienSecret,
    callbackURL : '/auth/google/callback',
    proxy : true
    },
async (accessToken, refreshToken, profile, done)=>{

  const existingUser = await Users.findOne({ googleID: profile.id });
   
        if (existingUser){
            return done(null,existingUser);
        }
         const user = await new Users({ googleID: profile.id}).save();
         done(null, user);
   
}));

