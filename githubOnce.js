/**
 * Created by cc on 2020/12/19.
 */

"use strict";
const {getLastCommitId} = require("./github/githubApi");

require('dotenv').config();
const {parse} = require('./github/pullRequest');
const {getRecentCompletedPullRequest} = require('./github/githubApi');

(async () => {
    let parse1 = await getLastCommitId('52386')
    console.log('parse1: ' + JSON.stringify(parse1, null, 4) + '\n');
})().catch(e => {
    console.error(e);
});
