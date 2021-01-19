/**
 * Created by cc on 2020/12/19.
 */
"use strict";
const {sync} = require("./cron/syncMergeStatsTask");
require('dotenv').config();

(async () => {
    await sync()
})().catch(e => {
    console.error(e);
});
