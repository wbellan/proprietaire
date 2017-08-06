const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const hbs = require('express-hbs');
const flash = require('express-flash');

const MongoStore = require('connect-mongo')(session);
const configDatabase = require('./config/database.js');
mongoose.connect(configDatabase.url, {
  useMongoClient: true
});

require('./config/passport.js');

let app = express();

// configure the view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/app/views/layouts/main.hbs',
  partialsDir: __dirname + '/app/views/partials',
  layoutsDir: __dirname + '/app/views/layouts'
}));
// configure views path
app.set('views', path.join(__dirname, '/app/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use(session({
  secret: "mysecretsessionkey",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

let userRoutes = require('./app/controllers/user');
app.use(userRoutes);

app.listen(port, () => {
  console.log(`The Propriétaire portal is now listening on port ${port}.`);
});
