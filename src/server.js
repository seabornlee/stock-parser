const express = require("express");
const app = express();
const Service = require("./service");
const KplService = require("./kpl_service");
const fs = require("fs")
const iconv = require('iconv-lite');

const service = new Service()
const kplService = new KplService()

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
  res.attachment('看多板块.xml')
  res.send(renderXML(await service.getCodes()));
});

function renderXML(data) {
  const buffer = fs.readFileSync('./template.xml')
  const xml = iconv.encode(iconv.decode(buffer, 'gb2312'), 'utf8').toString()
  const nodes = data.map(code => `<stk setcode="${code.charAt(0)}" code="${code.substring(1)}"/>`)
  return xml.replace("${codes}", nodes.join(""));
}

app.get("/kpl/code/xml/:blockIndex/:topCount", async (req, res) => {
  res.attachment('开盘啦板块.xml')
  res.send(renderXML(await kplService.getCodes(req.params.blockIndex, req.params.topCount)));
});
module.exports = app
