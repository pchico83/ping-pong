// dependencies
// /////////////

// core
var express = require('express'),
    app = express(),
    server = require('http').Server(app);

var util = require('util');

// configuration
// //////////////

app.locals.PORT = 8081;

// routes
// ///////

require('./pong-routes.js')(app);

// runtime
// ////////

// start server
server.listen(app.locals.PORT, function() {
   console.log(util.format('pong listening on http://localhost:%s',
     server.address().port)
   );
});

function shutdown() {
  process.exit(0);
}

// allow sigterm to kill app
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);