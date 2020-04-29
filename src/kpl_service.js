const Parser = require("./kpl_parser");
const { formatCode } = require('./util')

module.exports = class Service {
  async getCodes(blockIndex, topCount) {
    const parser = new Parser();
    const plates = await parser.parsePlates(blockIndex);
    const top2Plates = plates.slice(0, topCount);
    const stocks = [];
    for (const plate of top2Plates) {
      stocks.push(... await parser.parseStocks(plate.id));
    }
    return stocks.map(r => formatCode(r.code));
  }
};
