const fetch = require("node-fetch");

// ZSType：版块 7 精选，5 概念，4 行业，6 地区
// PType: 排序字段1 强度, 2 涨幅，3 涨速，5 主力净额

module.exports = class KplParser {
  async parsePlates(zsType, pType) {
    let result = [];
    await fetch("https://pchq.kaipanla.com/w1/api/index.php", {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: `c=PCArrangeData&a=GetZSIndexPlate&SelType=2&ZSType=${zsType}&PType=${pType}&POrder=1&PStart=&PEnd=&PIndex=0&Pst=20&UserID=&Token=`,
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        result = data.plates.list;
      });

    return result.map((r) => ({ id: r[0] }));
  }
  async parseStocks(plateId) {
    let result = [];
    await fetch("https://pchq.kaipanla.com/w1/api/index.php", {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "http://127.0.0.1:8081/kpl.html",
      referrerPolicy: "no-referrer-when-downgrade",
      body:
        "c=PCArrangeData&a=GetZSIndexPlate&SelType=3&LType=6&LOrder=1&LStart=&LEnd=&LIndex=0&Lst=0&PlateID=" +
        plateId +
        "&UserID=&Token=",
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        result = data.stocks.list;
      });

    return result.map((r) => ({ code: r[0] }));
  }
};
