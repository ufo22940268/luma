/**
 * Created by cc on 2020/12/19.
 */

"use strict";

const {ALLOWED_USERS} = require("../constants");

const {sendMessage} = require("../slack/message");
const {getParentThread} = require("../slack/event");
const {parse, isPullRequest, getPullRequestId} = require('../github/pullRequest');

function fromAllowedUser(event) {
  return ALLOWED_USERS.includes(event.user);
}

const devLuma = '<@U01J03EMAJU>';
const productionLuma = '<@U01GV0GTQG7>';
const luma = ['development', 'test'].includes(process.env.NODE_ENV) ? devLuma : productionLuma;

function atLuma(text) {
  return text && text.includes(luma);
}

async function replyInfo(channel, threadTs, info) {
  let message = "";

  if (info.jira) {
    message += `
Jira: ${info.jira.url}`;
  }

  if (info.demobox) {
    message += `
Demobox: ${info.demobox.url} (${info.demobox.time})`;
  }

  if (info.errors && info.errors.length) {
    message += `
    
*Attention: It\'s not the latest demobox. Please rebuild again.*
    `
  }

  if (!message) return;
  await sendMessage(channel, threadTs, {text: message});
}

function isFromRobotItsSelf({user}) {
  return [devLuma, productionLuma].includes(user);
}

module.exports = async (event) => {
  if (isFromRobotItsSelf(event)) {
    return;
  }

  let info;
  let text;
  let threadTs;
  if (atLuma(event.text)) {
    text = await getParentThread(event);
    threadTs = event.thread_ts;
  } else {
    if (!fromAllowedUser(event)) return;
    text = event.text;
    threadTs = event.ts;
  }

  if (text && isPullRequest(text)) {
    let pullRequestId = getPullRequestId(text);
    if (!pullRequestId) return;

    info = await parse(pullRequestId);
  }

  if (!info || info == {}) return;
  await replyInfo(event.channel, threadTs, info);
};
