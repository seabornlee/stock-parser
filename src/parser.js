const fetch = require('node-fetch')

module.exports = class StockParser {
  async parse() {
    const catagories = await this.fetchCatagories()
    const stocks = []
    for (let c of catagories) {
      const list = await this.fetchStocks(c[0])
      list.forEach(s => stocks.push(s[1]))
    }
    return stocks
  }

  async fetchStocks(code) {
    let result
    await fetch("http://calc.tdx.com.cn:7616/TQLEX?Entry=HQServ.hq_nlp", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://calc.tdx.com.cn:7616/site/kggx/fx_bkrdyc.html?color=%23%23tdxbk%23%23&bkcolor=%23%23tdxbkcolor%23%23","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"ReqId\":\"2200\",\"BkCode\":\"" + code + "\",\"Sort\":\"1\",\"SortType\":\"0\",\"PageSize\":\"50\",\"modname\":\"module_misc.dll\"}]","method":"POST","mode":"cors"})
      .then(res => res.json())
      .then(data => {
        result = data.ResultSets[1].Content
      })

    return result
  }

  async fetchCatagories() {
    let result
    await fetch("http://calc.tdx.com.cn:7616/TQLEX?Entry=HQServ.hq_nlp", {"credentials":"include","headers":{"accept":"text/plain, */*; q=0.01","accept-language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8","pragma":"no-cache","x-requested-with":"XMLHttpRequest"},"referrer":"http://calc.tdx.com.cn:7616/site/kggx/fx_bkrdyc.html?color=%23%23tdxbk%23%23&bkcolor=%23%23tdxbkcolor%23%23","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"ReqId\":\"2100\",\"UpCount\":\"5\",\"DownCount\":\"5\",\"modname\":\"module_misc.dll\"}]","method":"POST","mode":"cors"})
      .then(res => res.json())
      .then(data => {
        result = data.ResultSets[1].Content 
      })
    return result
  }
};
