const {getThreadText} = require("../slack/event");
const {getPullRequestId} = require("../github/pullRequest");
const {isPullRequest} = require("../github/pullRequest");
const {getParentThread} = require("../slack/event");
const {VERIFIED_EMOJI} = require("../slack/constants");
const {ALLOWED_USERS} = require("../slack/constants");
const {setQAVerifiedLabel} = require("../github/pullRequest");

module.exports = async (event) => {
  if (!ALLOWED_USERS.includes(event.user)) return;
  if (!VERIFIED_EMOJI.includes(event.reaction)) return;
  let text = await getThreadText(event.item.channel, event.item.ts);
  if (isPullRequest(text)) {
    await setQAVerifiedLabel(getPullRequestId(text));
  }
};
