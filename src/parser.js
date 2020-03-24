const Nightmare = require('nightmare')
const nightmare = Nightmare()
const cheerio = require('cheerio');

const url = 'http://calc.tdx.com.cn:7616/site/kggx/fx_bkrdyc.html?color=%23%23tdxbk%23%23&bkcolor=%23%23tdxbkcolor%23%23'

module.exports = class StockParser {
  parse() {
  }

  async fetchStock() {
    let data;
    await nightmare.goto(url).wait('.grid-table').evaluate(() => {
      return document.querySelector('.grid-table').innerHTML
    }).then((html) => {
      data = this.parseStock(html);
    }).catch( error => {
      console.log(error);
    });
    return data;
  }

  parseStock(data) {
    const $ = cheerio.load(data);
    const texts = $.text().split(' ');
    const numbers = new RegExp(/\d+\.\d+/);
    const names = texts.filter(t => t !== '' && !t.includes('%') && !numbers.test(t));
    return names; 
  }
}


