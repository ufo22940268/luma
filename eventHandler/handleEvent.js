/**
 * Created by cc on 2020/12/19.
 */

"use strict";

const moment = require("moment");

const {sendMessage} = require("../slack/message");
const {getParentThread} = require("../slack/event");
const {parse, isPullRequest, getPullRequestId} = require('../github/pullRequest');

const allowedUsers = ['U01EJL92F0F'];

function fromAllowedUser(event) {
  return allowedUsers.includes(event.user);
}


function atLuma(text) {
  return text === '<@U01GV0GTQG7>';
}

async function replyInfo(channel, threadTs, info) {
  let message = `
  `;

  if (info.jira) {
    message += `
Jira: ${info.jira.url}`;
  }

  if (info.demobox) {
    message += `
Demobox: ${info.demobox.url}`;
  }

  await sendMessage(channel, threadTs, {text: message});
}

function removeNoiseCharacters(text) {
  return text.replace(/[ \<\>]/g, '');
}

module.exports = async (event) => {
  if (!fromAllowedUser(event)) return;

  let info;
  let text;
  let threadTs;
  if (atLuma(event.text)) {
    text = await getParentThread(event);
    threadTs = event.thread_ts;
  } else {
    text = event.text;
    threadTs = event.ts;
  }

  text = removeNoiseCharacters(text)
  if (text && isPullRequest(text)) {
    let pullRequestId = getPullRequestId(text);
    if (!pullRequestId) return;

    info = await parse(pullRequestId);
  }

  if (!info) return;
  console.log('info: ' + JSON.stringify(info, null, 4) + '\n');
  await replyInfo(event.channel, threadTs, info);
};
