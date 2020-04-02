const {formatCode} = require('../src/util')

describe('util', function() {
  describe('formatCode', function() {
    it('prepend 1 given Hu market code', () => {
      expect(formatCode('600000')).toBe('1600000')
    });

    it('prepend 0 given Shen market code', () => {
      expect(formatCode('300002')).toBe('0300002')
    });
  });

});

