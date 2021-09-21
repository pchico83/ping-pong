module.exports = function(app){

    app.all('/pong', function(req, res) {
      res.send('pong from local');
    });
  
  };