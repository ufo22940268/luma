jest.mock('../slack/event');
jest.mock('../github/pullRequest');
const handleReaction = require('./handleReaction');
const event = require('../slack/event');
const {ALLOWED_USERS} = require("../slack/constants");
const {LUMA_NAME} = require("../slack/constants");
let {setQAVerifiedLabel, isPullRequest} = require('../github/pullRequest');
isPullRequest.mockImplementation(jest.requireActual('../github/pullRequest').isPullRequest);

describe('Reaction Added Handler', () => {


  beforeEach(() => {
    jest.clearAllMocks();
  });

  let SAMPLE_EVENT = {
    "type": "reaction_added",
    "user": "U01EJL92F0F",
    "reaction": "male-doctor",
    "item_user": "U0G9QF9C6",
    "item": {
      "type": "message",
      "channel": "C0G9QF9GZ",
      "ts": "1360782400.498405"
    },
    "event_ts": "1360782804.083113"
  };

  it('should react to QA Verified reaction ', async () => {
    event.getThread.mockImplementation(async () => ({
      user: ALLOWED_USERS[0],
      text: 'PTAL: https://github.com/UrbanCompass/uc-frontend/pull/43089'
    }));
    await handleReaction(SAMPLE_EVENT);
    expect(event.getThread).toBeCalled();
    expect(isPullRequest).toBeCalled();
    expect(setQAVerifiedLabel).toBeCalled();

    jest.clearAllMocks();
    event.getThread.mockImplementation(async () => ({
      user: 'swefwef',
      text: 'PTAL: https://github.com/UrbanCompass/uc-frontend/pull/43089'
    }));
    await handleReaction(SAMPLE_EVENT);
    expect(isPullRequest).not.toBeCalled();
    expect(setQAVerifiedLabel).not.toBeCalled();
  });

  it('should not handle event from other users ', () => {
    handleReaction({...SAMPLE_EVENT, user: 'kk'});
    expect(setQAVerifiedLabel).not.toBeCalled();
  });

  it('should not react to invalid reactions ', () => {
    handleReaction({...SAMPLE_EVENT, reaction: 'jj'});
    expect(setQAVerifiedLabel).not.toBeCalled();
  });
});
