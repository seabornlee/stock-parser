const express = require("express");
const app = express();
const KplService = require("./kpl_service");
const fs = require("fs");
const iconv = require("iconv-lite");

const kplService = new KplService();

function renderXML(data) {
  const buffer = fs.readFileSync("./template.xml");
  const xml = iconv.encode(iconv.decode(buffer, "gb2312"), "utf8").toString();
  const nodes = data.map(
    (code) => `<stk setcode="${code.charAt(0)}" code="${code.substring(1)}"/>`
  );
  return xml.replace("${codes}", nodes.join(""));
}

app.get("/kpl/code/xml/:blockIndex/:topCount", async (req, res) => {
  res.attachment("开盘啦板块.xml");
  res.send(
    renderXML(
      await kplService.getCodes(req.params.blockIndex, req.params.topCount)
    )
  );
});
module.exports = app;
