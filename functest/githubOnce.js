/**
 * Created by cc on 2020/12/19.
 */
"use strict";
const {request} = require("@octokit/request");
const {parse} = require('../github/pullRequest');

const privateKey = process.env.GITHUB_PRIVATE_KEY;
(async () => {
  const pullId = "42939";
  let parse1 = await parse(pullId);
  console.log('parse1: ' + JSON.stringify(parse1, null, 4) + '\n');
})().catch(e => {
  console.error(e);
});
