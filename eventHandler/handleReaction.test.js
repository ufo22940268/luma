jest.mock('../github/pullRequest');
jest.mock('../slack/event', () => {
  return {...jest.requireActual('../slack/event'), getParentThread: jest.fn(async () => 'wefoijwoiejf')};
});
const event = require('../slack/event');
const handleReaction = require('./handleReaction');
const {setQAVerifiedLabel} = require('../github/pullRequest');

describe('Reaction Added Handler', () => {

  beforeEach(() => {
    jest.resetAllMocks();
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
    expect(setQAVerifiedLabel).toBeCalled();
    expect(event.getParentThread).toBeCalledWith(SAMPLE_EVENT);
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
