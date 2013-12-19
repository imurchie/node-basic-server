var fs          = require("fs");
var queryString = require("querystring");
var formidable  = require("formidable");

function start(request, response) {
  console.log("Request handler 'start' was called.");

  fs.readFile("./public/index.html", "utf8", function(error, data) {
    response.writeHead(200, {
    "Content-Type": "text/html"
    });
    response.write(data);
    response.end();
  });
}

function upload(request, response) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("    About to parse...");
  form.parse(request, function(error, fields, files) {
    console.log("    Parsing finished.");

    fs.rename(files.upload.path, "./tmp/test.png", function(error) {
      if(error) {
        fs.unlink("./tmp/test.png");
        fs.rename(files.upload.path, "./tmp/test.png");
      }
    });

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write("received image:<br>");
    response.write("<img src=\"/show\" />");
    response.end();
  });
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {
    "Content-Type": "image/png"
  });
  fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start   = start;
exports.upload  = upload;
exports.show    = show;
