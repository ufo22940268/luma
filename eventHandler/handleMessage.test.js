jest.mock('../slack/message');
jest.mock('../github/pullRequest');
const {parse, isPullRequest, getPullRequestId} = require('../github/pullRequest');
parse.mockImplementation(async () => ({demobox: {url: 'aa'}}));

const actualPullRequest = jest.requireActual('../github/pullRequest');
isPullRequest.mockImplementation(actualPullRequest.isPullRequest);
getPullRequestId.mockImplementation(actualPullRequest.getPullRequestId);

const handle = require('./handleMessage');
const message = require('../slack/message');

describe('Event Handler', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process pull request message', async () => {
    await handle({
      text: 'PTAL: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0F'
    });
    expect(parse).toBeCalledWith('43089');
    jest.clearAllMocks();
    await handle({
      text: 'ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0F'
    });
    expect(parse).toBeCalled();
    expect(message.sendMessage).toBeCalled();
  });

  it('should ignore other message', async () => {
    await handle({text: 'PTAL: wefoijwoiefj', user: 'U01EJL92F0F'});
    expect(parse).not.toBeCalled();

    jest.clearAllMocks();
    await handle({
      text: 'ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0K'
    });
    expect(parse).not.toBeCalled();
  });
});
