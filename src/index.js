const express = require("express");
const app = require('./server');

let server = app.listen(80, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Your App is running at http://%s:%s", host, port);
});
