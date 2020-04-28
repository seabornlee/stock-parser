const KplParser = require('../src/kpl_parser')

describe('Kpl Parser', function() {
  it('抓取按强度倒序排序的板块代码', async () => {
    const parser = new KplParser()
    const plates = await parser.parsePlates()
    expect(plates.length).toBeGreaterThan(0)
    //    [
    //        "801464",
    //        "农业",
    //        3508.69,
    //        0.05,
    //        0.36,
    //        31826619844,
    //        -369645523,
    //        1916243349,
    //        -2285888872,
    //        1.08,
    //        1082316100800,
    //        0.05,
    //        "1080.18"
    //    ]
    expect(plates[0].id).toHaveLength(6)
  });

  it('抓取指定板块下的股票代码', async () => {
    const parser = new KplParser()
    const stocks = await parser.parseStocks("801464")
    expect(stocks.length).toBeGreaterThan(0)
    expect(stocks[0].code).toHaveLength(6)
  })
});

