/**
 * Created by cc on 2020/12/23.
 */
"use strict";

const path = require("path");
require('dotenv').config({path: path.join(__dirname, '../.env')});
const {getRecentCompletedPullRequest} = require("../github/api");
const web = require('../slack/web');
const {SLACK_CHANNELS} = require("../constants");

function matchPR(text, mergedUrls) {
  let m = text.trim().match(/uc-frontend\/(pull\/\d+)/);
  if (!m) return;
  return mergedUrls.some(u => u.includes(m[1]));
}

async function sync() {
  let mergedUrls = (await getRecentCompletedPullRequest()).map(t => t.url);
  for (let channel of SLACK_CHANNELS) {
    let threads = (await web.conversations.history({channel: channel}))
      .messages
      .filter(t => matchPR(t.text, mergedUrls))
      .map(t => t.ts);
    for (let thread of threads) {
      try {
        await web.reactions.add({channel, timestamp: thread, name: 'merge'});
      } catch(e) {
        if (e.data && e.data.error === 'already_reacted') {
          //Do nothing
        } else {
          throw e;
        }
      }
    }
  }
}

exports.sync = sync;

if (require.main === module) {
  (sync()).catch(console.error).finally(() => process.exit(0))
}



