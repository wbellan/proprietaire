const express = require('express');
const bodyParser = require('body-parser');

let app = express();

// static file location
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// parse the HTTP body messages
app.use(bodyParser.urlencoded({extended: false}));

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// start the server
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
