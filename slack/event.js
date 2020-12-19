/**
 * Created by cc on 2020/12/19.
 */
"use strict";

const web = require('./web');

exports.getParentThread = async (event) => {
  let result = await web.conversations.replies({channel: event.channel, ts: event.thread_ts});
  if (!result.messages) {
    return '';
  }
  return result.messages[0].text;
};

