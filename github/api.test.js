jest.mock('@octokit/request', () => {
    return {
        request: {
            defaults: () => () => ({
                data: [
                    {user: {login: 'kk'}, html_url: 'kk', merged_at: new Date()},
                    {user: {login: 'ufo22940268'}, html_url: 'ufo', merged_at: new Date()}
                ]
            })
        }
    };
});
const {getRecentCompletedPullRequest} = require('./api');

describe('Api', () => {
    it('should only get my pull requests', async () => {
        const r = await getRecentCompletedPullRequest();
        expect(r)
            .toHaveLength(1);
        expect(r)
            .toContainEqual({url: 'ufo'});
        expect(r)
            .not.toContainEqual({url: 'kk'});
    });
});
