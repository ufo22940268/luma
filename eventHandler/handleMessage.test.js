jest.mock('../github/pullRequest', () => ({
  ...jest.requireActual('../github/pullRequest'), parse: jest.fn()
}));
const {parse} = require('../github/pullRequest');
const handle = require('./handleMessage');
describe('Event Handler', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should process pull request message', async () => {
    await handle({
      text: 'PTAL: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0F'
    });
    expect(parse).toBeCalledWith('43089');
    jest.resetAllMocks();
    await handle({
      text: 'ptal: https://github.com/UrbanCompass/uc-frontend/pull/43089',
      user: 'U01EJL92F0F'
    });
    expect(parse).toBeCalled();
  });

  it('should ignore other message', async () => {
    await handle({text: 'PTAL: wefoijwoiefj', user: 'U01EJL92F0F'});
    expect(parse).not.toBeCalled();
  });
});
