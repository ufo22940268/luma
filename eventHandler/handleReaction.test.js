describe('Reaction Added Handler', () => {

  jest.doMock('../slack/event');
  jest.doMock('../github/pullRequest');
  const handleReaction = require('./handleReaction');
  const event = require('../slack/event');
  event.getParentThread.mockImplementation(async () => 'PTAL: https://github.com/UrbanCompass/uc-frontend/pull/43089');
  let {setQAVerifiedLabel, isPullRequest} = require('../github/pullRequest');
  isPullRequest.mockReturnValue(true);

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
    await handleReaction(SAMPLE_EVENT);
    expect(event.getParentThread).toBeCalled();
    expect(setQAVerifiedLabel).toBeCalled();
    expect(isPullRequest).toBeCalled();
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
