/**
 * Created by cc on 2020/12/19.
 */
"use strict";

const web = require('./web');


exports.sendMessage = async (channel, threadTs, {text} = {text: ''}) => {
  if (!threadTs) {
    throw new Error('thread ts is required');
  }
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({channel: channel, thread_ts: threadTs, text});

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
};
