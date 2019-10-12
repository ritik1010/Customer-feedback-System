const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/users')
const bcrypt=require('bcryptjs')
passport.use(new LocalStrategy(
  function(email, password, done) {
      console.log('start')
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
          console.log("incorrect username")
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password,user.password,function(err,isMatch){
          if(isMatch){console.log("success")
              return done(null,user)
          }
          else{
              return done(null,false,{message:"No user Found"})
          }

      })
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    });
  }
));