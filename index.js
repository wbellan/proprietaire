const express = require('express');

let app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});
