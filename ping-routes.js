var http = require('http');

var options = {
  host: 'localhost',
  port: 8081,
  path: '/pong'
};

module.exports = function(app){

    app.all('/ping', function(req, res) {

      var req = http.request(options, function (response) {

        response.on('data', function (chunk) {});

        response.on('end', function () {
          res.send('"pong" is healthy');
        });
      });

      req.on('error', function(err) {
        res.send('"pong" is not running');
      });

      req.end();
    })
  }