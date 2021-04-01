
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
      },
      getLastCommitId: () => '4b74efc8d1eb7bcaa07cf76d422cd46ac5eade26'
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
      },
      getLastCommitId: () => '4b74efc8d1eb7bcaa07cf76d422cd46ac5eade26'
    }));
    const parse = require('./pullRequest.js').parse;
    const r = await parse('42939');
    expect(r).toHaveProperty('demobox', expect.anything());
    expect(r.demobox).toHaveProperty('url', expect.stringMatching(/app\/ads-center\/digital\/home$/));
    expect(r.demobox).toHaveProperty('time', expect.anything());
  })

  it('should returns an error when demobox is not the latest one', async () => {
    jest.mock('./githubApi', () => ({
      requestWithAuth: async (req) => {
        if (req === 'GET /repos/{owner}/{repo}/issues/{issue_number}') {
          return {data: {body: 'https://compass-tech.atlassian.net/browse/DAP-1432'}};
        } else {
          return require(`./__fixtures__/pr_42939.json`);
        }
      },
      getLastCommitId: () => '7d00d098d1eb7bcaa07cf76d422cd46ac5eade26'
    }));

    const parse = require('./pullRequest.js').parse;
    const r = await parse('42939');
    expect(r).toHaveProperty('errors', ['NOT_LATEST']);
  })

  it('should not returns an error when demobox is the latest one', async () => {
    jest.mock('./githubApi', () => ({
      requestWithAuth: async (req) => {
        if (req === 'GET /repos/{owner}/{repo}/issues/{issue_number}') {
          return {data: {body: 'https://compass-tech.atlassian.net/browse/DAP-1432'}};
        } else {
          return require(`./__fixtures__/pr_42939.json`);
        }
      },
      getLastCommitId: () => '4b74efc8d1eb7bcaa07cf76d422cd46ac5eade26'
    }));

    const parse = require('./pullRequest.js').parse;
    const r = await parse('42939');
    expect(r).toHaveProperty('errors', ['NOT_LATEST']);
  })
});
