const {removeNoiseCharacters} = require("../slack/event");
const {getThread} = require("../slack/event");
const {getPullRequestId} = require("../github/pullRequest");
const {isPullRequest} = require("../github/pullRequest");
const {VERIFIED_EMOJI} = require("../slack/constants");
const {ALLOWED_USERS} = require("../slack/constants");
const {setQAVerifiedLabel} = require("../github/pullRequest");

module.exports = async (event) => {
  if (!VERIFIED_EMOJI.includes(event.reaction)) return;
  let {text, user} = await getThread(event.item.channel, event.item.ts);

  if (!ALLOWED_USERS.includes(user)) return;

  text = removeNoiseCharacters(text);
  if (isPullRequest(text)) {
    await setQAVerifiedLabel(getPullRequestId(text));
  }
};
