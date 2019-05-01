var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("entro");
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
var five = require("johnny-five"),
board, buttonL, buttonR;

board = new five.Board();

board.on("ready", function () {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  buttonL = new five.Button(2);
  buttonR = new five.Button(4);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
      button: buttonL
  });
  board.repl.inject({
      button: buttonR
  });

  // Button Event API

  // "down" the button is pressed
  buttonL.on("down", function () {
      console.log("Ldown");
      io.emit('chat message', "Ldown");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  buttonL.on("hold", function () {
      console.log("Lhold");
      io.emit('chat message', "Lhold");
  });

  // "up" the button is released
  buttonL.on("up", function () {
      console.log("Lup");
      io.emit('chat message', "Lup");
  });

  // "down" the button is pressed
  buttonR.on("down", function () {
      console.log("Rdown");
      io.emit('chat message', "Rdown");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  buttonR.on("hold", function () {
      console.log("Rhold");
      io.emit('chat message', "Rhold");
  });

  // "up" the button is released
  buttonR.on("up", function () {
      console.log("Rup");
      io.emit('chat message', "Rup");
  });
});
