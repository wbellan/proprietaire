'use strict';

const app       = require('app');
const browser   = require('browser-window');
const electrify = require('electrify')(__dirname);

var window = null;
var splash = null;

app.on('ready', function() {

  splash = new browser({
    width: 600, height: 300,
    frame: false,
    resizable: false,
    'node-integration': false 
  });

  splash.loadURL('file://' + __dirname + '/splash.html');

  // electrify start
  electrify.start(function(meteor_root_url) {
    console.log(meteor_root_url);
    splash.close();

    // creates a new electron window
    window = new browser({
      width: 1200, height: 900,
      'node-integration': false // node integration must to be off
    });

    // open up meteor root url
    window.loadURL(meteor_root_url);

    // Emitted when the window is closed.
    window.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window = null;
    });
  });
});


app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('will-quit', function terminate_and_quit(event) {

  // if electrify is up, cancel exiting with `preventDefault`,
  // so we can terminate electrify gracefully without leaving child
  // processes hanging in background
  if(electrify.isup() && event) {

    // holds electron termination
    event.preventDefault();

    // gracefully stops electrify
    electrify.stop(function(){

      // and then finally quit app
      app.quit();
    });
  }
});

//
// =============================================================================
//
// the methods bellow can be called seamlessly from your Meteor's
// client and server code, using:
//
//    Electrify.call('methodname', [..args..], callback);
//
// ATENTION:
//    From meteor, you can only call these methods after electrify is fully
//    started, use the Electrify.startup() convenience method for this
//
//
// Electrify.startup(function(){
//   Electrify.call(...);
// });
//
// =============================================================================
//
// electrify.methods({
//   'method.name': function(name, done) {
//     // do things... and call done(err, arg1, ..., argN)
//     done(null);
//   }
// });
//
