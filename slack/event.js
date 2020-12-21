/**
 * Created by cc on 2020/12/19.
 */
"use strict";

const web = require('./web');

function removeNoiseCharacters(text) {
  if (!text) {
    return text;
  }

  return text.replace(/[ \<\>]/g, '');
}

exports.removeNoiseCharacters = removeNoiseCharacters;

exports.getThread = async (channel, ts) => {
  let result = await web.conversations.replies({channel: channel, ts: ts});
  if (!result.messages) {
    return;
  }
  return result.messages[0];
};

exports.getParentThread = async (event) => {
  let result = await web.conversations.replies({channel: event.channel, ts: event.thread_ts});
  if (!result.messages) {
    return '';
  }
  return removeNoiseCharacters(result.messages[0].text);
};

