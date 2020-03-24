const express = require('express');
const app = express();
const StockParser = require('./parser')

let server = app.listen(5000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

app.get('/', async (req, res) => {
  const data = await new StockParser().fetchStock()
  const string = data.join('\r\n')
  res.send(string);
});

