const express = require("express");
const app = express();
const Service = require("./service");
const fs = require("fs")
const iconv = require('iconv-lite');

const service = new Service() 

app.get("/:type", async (req, res) => {
  const type = req.params.type
  if (type != 'code' && type != 'name') {
    res.status(404).send()
    return
  }

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

app.get("/code/xml", async (req, res) => {
  let data = await service.getCodes();
  const nodes = data.map(code => `<stk setcode="${code.charAt(0)}" code="${code.substring(1)}"/>`)
  const buffer = fs.readFileSync('./template.xml')
  const template = iconv.decode(buffer, 'gb2312')
  const xml = iconv.encode(template, 'utf8').toString()
  const result = xml.replace("${codes}", nodes.join(""))
  res.attachment('看多板块.xml')
  res.send(result);
});
module.exports = app
