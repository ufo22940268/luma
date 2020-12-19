/**
 * Created by cc on 2020/12/19.
 */
"use strict";
const {getParentThread} = require("../slack/event");
const channel = 'D01GV0HT60P';
const threadTs = '1608339317.007800';
(async () => {
  // await sendMessage(channel, threadTs,  {text: 'wefoijweoifj'});
  let text = await getParentThread({channel: 'C01H9RJ4518', thread_ts: '1608353157.009800'})
  console.log('text: ' + JSON.stringify(text, null, 4) + '\n');
})()
