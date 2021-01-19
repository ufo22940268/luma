/**
 * Created by cc on 2020/12/19.
 */
"use strict";
const {sync} = require("./cron/syncMergeStatsTask");
const jiraClient = require('./jira/jiraClient');
require('dotenv').config();

(async () => {
    // await sync()
    let r = await jiraClient.findIssue("MS-456");
    console.log('r: ' + JSON.stringify(r, null, 4) + '\n');
})().catch(e => {
    console.error(e);
});
