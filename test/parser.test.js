const StockParser = require('../src/parser')

describe('Stock Parser', function() {
  it('parse bullish stocks', async () => {
    const parser = new StockParser()
    const stocks = await parser.parse()
    expect(stocks.length).toBeGreaterThanOrEqual(0)
    if (stocks.length === 0) {
      return
    }

    // [ '300529', '健帆生物', '0', '4.7163', '2.6529' ]
    expect(stocks[0].length).toBe(5)
    expect(stocks[0][0].length).toBe(6) // code
  });

});

