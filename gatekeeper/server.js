const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const uid = require('uid-safe');
const hbs = require('express-hbs');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const configDatabase = require('./config/database.js');
mongoose.createConnection(configDatabase.url, {
  server: {
    poolSize: 4
  }
});

require('./config/passport')(passport);

var app = express();

app.set('view engine', 'hbs');
// configure the view engine
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layouts/main.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));
// configure views path
app.set('views', path.join(__dirname, '/views'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
console.log(`The Propriétaire gatekeeper is now listening on port ${port}.`);
