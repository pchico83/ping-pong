// dependencies
// /////////////

// core
var express = require('express'),
    app = express(),
    server = require('http').Server(app);

var util = require('util');

// configuration
// //////////////

app.locals.PORT = 8080;

// routes
// ///////

require('./ping-routes.js')(app);

// runtime
// ////////

// start server
server.listen(app.locals.PORT, function() {
   console.log(util.format('ping listening on http://localhost:%s',
     server.address().port)
   );
});

function shutdown() {
  process.exit(0);
}

// allow sigterm to kill app
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);