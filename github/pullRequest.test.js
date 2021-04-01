
describe('Pull Request', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should parse the demobox link and created time', async () => {
    jest.mock('./githubApi', () => ({
      requestWithAuth: async (req) => {
        if (req === 'GET /repos/{owner}/{repo}/issues/{issue_number}') {
          return {data: {body: 'https://compass-tech.atlassian.net/browse/MCSC-548'}};
        } else {
          return require(`./__fixtures__/pr_42939.json`);
        }
      }
    }));
    const parse = require('./pullRequest.js').parse;
    const r = await parse('42939');
    expect(r).toHaveProperty('demobox', expect.anything());
    expect(r.demobox).toHaveProperty('url', expect.stringMatching(/sign-center$/));
    expect(r.demobox).toHaveProperty('time', expect.anything());
  });

  it('should append digital sign path for ads center tickets', async () => {
    jest.mock('./githubApi', () => ({
      requestWithAuth: async (req) => {
        if (req === 'GET /repos/{owner}/{repo}/issues/{issue_number}') {
          return {data: {body: 'https://compass-tech.atlassian.net/browse/DAP-1432'}};
        } else {
          return require(`./__fixtures__/pr_42939.json`);
        }
      }
    }));
    const parse = require('./pullRequest.js').parse;
    const r = await parse('42939');
    expect(r).toHaveProperty('demobox', expect.anything());
    expect(r.demobox).toHaveProperty('url', expect.stringMatching(/app\/ads-center\/digital\/home$/));
    expect(r.demobox).toHaveProperty('time', expect.anything());
  })
});
