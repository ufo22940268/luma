const {getParentThread} = require("../slack/event");
const {VERIFIED_EMOJI} = require("../slack/constants");
const {ALLOWED_USERS} = require("../slack/constants");
const {setQAVerifiedLabel} = require("../github/pullRequest");

module.exports = async (event) => {
  if (!ALLOWED_USERS.includes(event.user)) return;
  if (!VERIFIED_EMOJI.includes(event.reaction)) return;
  let parentThread = await getParentThread(event);
  console.log('parentThread: ' + JSON.stringify(parentThread, null, 4) + '\n');
  await setQAVerifiedLabel();
};
