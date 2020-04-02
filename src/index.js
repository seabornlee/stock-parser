const express = require('express');
const app = express();
const Service = require('./service')

let server = app.listen(80, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

app.get('/', async (req, res) => {
  res.download(await new Service().getFilePath())
});

