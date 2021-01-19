// jest.mock('../github/githubApi');
const {getRecentCompletedPullRequest} = require('../github/githubApi');
const {sync} = require('./syncMergeStatsTask');
const web = require('../slack/web');
const {SLACK_CHANNELS} = require('../constants');

describe('syncMergeStatsTask', () => {

    it.skip('should not sync github merge stats to slack', async () => {
        getRecentCompletedPullRequest.mockReturnValue([{url: 'https://github.com/UrbanCompass/uc-frontend/pull/43089'}]);
        web.conversations.history.mockReturnValue({
            'ok': true,
            'messages': [{
                'type': 'message',
                'user': 'U012AB3CDE',
                'text': 'aefweijif: https://github.com/UrbanCompass/uc-frontend/pull/43089',
                'ts': '1512085950.000216'
            }, {
                'type': 'message',
                'user': 'U061F7AUR',
                'text': 'ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089',
                'ts': '1512104434.000490'
            }],
            'has_more': true,
            'pin_count': 0,
            'response_metadata': {'next_cursor': 'bmV4dF90czoxNTEyMDg1ODYxMDAwNTQz'}
        });
        await sync();
        expect(getRecentCompletedPullRequest)
            .toBeCalled();
        expect(web.reactions.add)
            .not
            .toBeCalledWith({
                channel: SLACK_CHANNELS[0], name: 'merge', timestamp: '1512104434.000490'
            });
        expect(web.reactions.add)
            .not
            .toBeCalledTimes(1);
    });
});
