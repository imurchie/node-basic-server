var server          = require("./server");
var router          = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {
  "/":       requestHandlers.start,
  "/start":  requestHandlers.start,
  "/upload": requestHandlers.upload
}

server.start(8888, router.route, handle);
