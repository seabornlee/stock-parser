const StockParser = require('../src/parser')

describe('Stock Parser', function() {
  it('parse bullish stocks', async () => {
    const parser = new StockParser()
    const stocks = await parser.parse()
    expect(stocks.length).toBeGreaterThanOrEqual(0)
    if (stocks.length === 0) {
      return
    }

    // [ '002159', '三特索道', '0', '0.1674', '6.1925', '1.1437' ]
    expect(stocks[0].length).toBe(6)
    expect(stocks[0][0].length).toBe(6) // code
  });

});

