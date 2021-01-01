const Parser = require("./kpl_parser");
const { formatCode } = require('./util')

module.exports = class Service {
  async getCodes(blockIndex, topCount) {
    const parser = new Parser();
    const plates = await parser.parsePlates(blockIndex);
    const filteredPlates = plates.filter(p => p.id !== '801314') // ST版块
    const topPlates = filteredPlates.slice(0, topCount);
    const stocks = [];
    for (const plate of topPlates) {
      stocks.push(... await parser.parseStocks(plate.id));
    }
    return stocks.map(r => formatCode(r.code));
  }
};
