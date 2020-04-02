const StockParser = require("./parser");
const fs = require("fs");
const path = require("path");
const { formatCode } = require('./util')

module.exports = class Service {
  async getCodes() {
    const data = await this.getStockData()
    return data.map(r => {
      const code = r[0]
      return formatCode(code)
    })
  }

  async getNames() {
    const data = await this.getStockData()
    return data.map(r => r[1])
  }

  async getStockData() {
    const filePath = path.resolve("./data/", this.getFileName());
    if (!fs.existsSync(filePath)) {
      const data = await new StockParser().parse();
      fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
    }
    const text = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(text);
  }

  getFileName() {
    const date = new Date();
    const mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
      ".txt"
    ].join("");
  }
};
