var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -la", function(error, stdout, stderr) {
    setContentType(response);
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  setContentType(response);
  response.write("Hello Upload");
  response.end();
}

function setContentType(response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
}

exports.start = start;
exports.upload = upload;
