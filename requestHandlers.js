var fs          = require("fs");
var queryString = require("querystring");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  fs.readFile("./public/index.html", "utf8", function(error, data) {
    response.writeHead(200, {
    "Content-Type": "text/html"
  });
    response.write(data);
    response.end();
  });
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write("You have sent: " + queryString.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;
