var http  = require("http");
var url   = require("url");

function start(port, route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for '" + pathname + "' received.");

    var postData = "";
    var chunkCount = 0;
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      chunkCount++;
    });
    request.addListener("end", function() {
      console.log("Received " + chunkCount + " chunks of POST data.");
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started");
}

exports.start = start;
