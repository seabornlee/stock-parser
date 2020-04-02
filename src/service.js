const StockParser = require("./parser");
const fs = require("fs");
const path = require("path");

module.exports = class Service {
  async getFilePath() {
    const filePath = path.resolve("./data/", this.getFileName());
    if (!fs.existsSync(filePath)) {
      const data = await new StockParser().parse();
      const string = data.join("\r\n");
      fs.writeFileSync(filePath, string, "utf-8");
    }
    return filePath;
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
