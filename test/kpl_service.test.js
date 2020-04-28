const Service = require('../src/kpl_service')

describe('KplServiceTest', () => {
  describe('getCodes', function() {
    let codes;
    beforeAll(async () => {
      codes = await new Service().getCodes()
    });

    it('formats the code', async () => {
      codes.forEach(code => {
        expect(code).toHaveLength(7);
      })
    })
  });
});
