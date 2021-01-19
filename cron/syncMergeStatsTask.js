/**
 * Created by cc on 2020/12/23.
 */
'use strict';

const path = require('path');
require('dotenv')
    .config({path: path.join(__dirname, '../.env')});
const {getRecentCompletedPullRequest} = require('../github/githubApi');
const web = require('../slack/web');
const {parseJira} = require("../github/pullRequest");
const {isPullRequest} = require('../github/pullRequest');
const {SLACK_CHANNELS} = require('../constants');

function matchPR(text, mergedUrls) {
    if (!isPullRequest(text)) return;

    let m = text.trim()
        .match(/uc-frontend\/(pull\/\d+)/);
    if (!m) return;
    return mergedUrls.some(u => u.includes(m[1]));
}

let syncToSlack = async function (mergedUrls) {
    for (let channel of SLACK_CHANNELS) {
        let threads = (await web.conversations.history({channel: channel}))
            .messages
            .filter(t => matchPR(t.text, mergedUrls))
            .map(t => t.ts);
        for (let thread of threads) {
            try {
                await web.reactions.add({channel, timestamp: thread, name: 'merge'});
            } catch (e) {
                if (e.data && e.data.error === 'already_reacted') {
                    //Do nothing
                } else {
                    throw e;
                }
            }
        }
    }
};

function getGithubId(url) {
    let m = url.match(/github.+\/(\d+)$/);
    if (!m[1]) {
        throw new Error(`id not found for ${url}`);
    }

    return m[1];
}

async function syncToJira(urls) {
    let jiraUrls = []
    for (let id of urls.map(getGithubId)) {
        jiraUrls.push((await parseJira(id)).url);
    }

    console.log('jiraUrls: ' + JSON.stringify(jiraUrls, null, 4) + '\n');
}

async function sync() {
    let mergedUrls = (await getRecentCompletedPullRequest()).map(t => t.url);
    await syncToJira(mergedUrls);
}

exports.sync = sync;

if (require.main === module) {
    (sync()).catch(console.error)
        .finally(() => process.exit(0));
}



