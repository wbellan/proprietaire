const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../app/models/user');

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({
    'email': email
  }, (err, user) => {
    if (err) return done(err);
    if (user) {
      console.log('User already exists.');
      req.flash('signupError', 'Account already exists.');
      return done(null, false);
    }
    let newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.save((err) => {
      if (err) return done(err);

      req.session.user = user; //refresh the session value
      return done(null, newUser);
    });
  });
}));

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({
    'email': email
  }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      req.flash('loginError', 'The email and/or password you entered is incorrect.');
      return done(null, false);
    }

    if (!user.validPassword(req.body.password)) {
      req.flash('loginError', 'The email and/or password you entered is incorrect.');
      return done(null, false);
    }

    req.session.user = user; //refresh the session value
    return done(null, user);
  });
}));
