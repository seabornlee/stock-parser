const express = require('express');
const app = express();
const StockParser = require('./parser')

let server = app.listen(80, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

app.get('/', async (req, res) => {
  const data = await new StockParser().parse()
  const string = data.join('\r\n')
  res.contentType('text/plain');
  res.set({
    'Content-Type': 'text/plain',
    'Content-Disposition': 'attachment; filename=stocks.txt' 
  })
  res.send(string);
});

