const KplParser = require('../src/kpl_parser')

describe('Kpl Parser', function() {
  let parser;

  beforeEach(() => {
    parser = new KplParser();
  });

  it.each([1, 2, 3, 4])('抓取板块', async (blockIndex) => {
    const plates = await parser.parsePlates(blockIndex)
    expect(plates.length).toBeGreaterThan(0)
    expect(plates[0].id).toHaveLength(6)
  });

  it('抓取指定板块下的股票代码', async () => {
    const stocks = await parser.parseStocks("801464")
    expect(stocks.length).toBeGreaterThan(0)
    expect(stocks[0].code).toHaveLength(6)
  })
});

