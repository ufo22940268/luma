jest.mock('../slack/message');
jest.mock('../slack/event');
jest.mock('../github/pullRequest');
const {parse, isPullRequest, getPullRequestId} = require('../github/pullRequest');
parse.mockImplementation(async () => ({demobox: {url: 'aa'}}));

const event = require('../slack/event');
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

  it('should not send message when parse return null', async () => {
    parse.mockReset();
    parse.mockReturnValue({});
    let handle = require('./handleMessage');
    await handle({
      text: 'ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0F'
    });
    expect(message.sendMessage).not.toBeCalled();
  });

  it('should process at message', async () => {
    event.getParentThread.mockReturnValue('ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089');
    await handle({
      text: '<@U01J03EMAJU>'
    });
    expect(parse).toBeCalled();
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
