const express = require("express");
const app = express();
const Service = require("./service");

app.get("/:type", async (req, res) => {
  const type = req.params.type
  if (type != 'code' && type != 'name') {
    res.status(404).send()
    return
  }

  const service = new Service()
  let data
  if (type === 'code') 
    data = await service.getCodes();
  else
    data = await service.getNames();

  const string = data.join("\r\n");
  res.contentType("text/plain");
  res.set({
    "Content-Disposition": `attachment; filename=stocks-${req.params.type}.BLK`
  });
  res.send(string);
});

module.exports = app
