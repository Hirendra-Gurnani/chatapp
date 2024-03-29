var express = require("express");
var app = express();
var port = process.env.PORT || 80;
var cons = require("consolidate");

// Set view of '/' end point
// app.set('views', __dirname + '/views');
// app.set('view engine', "html");
// app.engine('html', require('html').__express);
app.engine("html", cons.swig);
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.get("/", function (req, res) {
  res.render("page");
});

// use our puclic/chat.js file as listener
app.use(express.static(__dirname + "/public"));
// Set port
var midPort = app.listen(port, function () {
  console.log("Node.js listening on port " + port);
});

var io = require("socket.io").listen(midPort);
// set up socket connection
io.sockets.on("connection", function (socket) {
  socket.emit("message", { message: "Welcome to the Real Time Web Chat" });
  socket.on("send", function (data) {
    io.sockets.emit("message", data);
  });
});
