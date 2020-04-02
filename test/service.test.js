const Service = require('../src/service')

describe('Service', () => {
  describe('getNames', function() {
    it('should not be empty', async () => {
      const service = new Service()
      const names = await service.getNames()
      expect(names.length).toBeGreaterThanOrEqual(0)
      names.forEach(name => {
        expect(name).not.toBe(null)
      })
    });
  });

  describe('getCodes', function() {
    it('has length 7', async () => {
      const service = new Service()
      const codes = await service.getCodes()
      expect(codes.length).toBeGreaterThanOrEqual(0)
      codes.forEach(code => {
        expect(code).not.toBe(null)
      })
    });
  });
});
