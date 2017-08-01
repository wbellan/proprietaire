const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const uid = require('uid-safe')

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const configDatabase = require('./config/database.js');

// mongoose.connect(configDatabase.url);

// require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy

var sess = {
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  genid: function(req) {
    return uid.sync(18);
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log(`The Propriétaire portal is now listening on port ${port}.`);
