/**
 * Created by cc on 2020/12/19.
 */
"use strict";
require('dotenv').config();
const {parse} = require('./github/pullRequest');
const {getRecentCompletedPullRequest} = require('./github/api');

(async () => {
    let parse1 = await getRecentCompletedPullRequest();
    console.log('parse1: ' + JSON.stringify(parse1, null, 4) + '\n');
})().catch(e => {
    console.error(e);
});
