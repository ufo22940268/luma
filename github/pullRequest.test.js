let {parse} = require('./pullRequest.js');

describe('Pull Request', () => {
  describe('For Sample 1', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.mock('./api', () => ({
        requestWithAuth: async () => {
          return require(`./__fixtures__/pr_42939.json`);
        }
      }));
      parse = require('./pullRequest.js').parse;
    });

    it('should parse the demobox link and created time', async () => {
      const r = await parse('42939');
      expect(r).toHaveProperty('demobox', expect.anything());
      expect(r.demobox).toHaveProperty('url', expect.anything());
      //Fix
    });
  });
});
