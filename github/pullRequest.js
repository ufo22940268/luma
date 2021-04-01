const {requestWithAuth} = require("./githubApi");

const moment = require('moment');
const urlUtil = require('url');
const {COMPASS_FRONTEND_REPO} = require("../constants");
const {COMPASS_OWNER} = require("../constants");

function parseUrlFromBody(body) {
  return body.match(/\((http:.+)\)/)[1];
}

async function parseDemobox(pullRequestId) {
  const {data} = await requestWithAuth("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner: COMPASS_OWNER,
    repo: COMPASS_FRONTEND_REPO,
    issue_number: pullRequestId
  });
  const comment = data.find(t => t.body.includes('Demobox Link'));
  if (!comment) {
    return;
  }

  const {body, updated_at} = comment;
  const url = parseUrlFromBody(body);
  return {
    url: url,
    time: moment(updated_at).fromNow()
  };
}

async function parseJira(pullRequestId) {
  const {data} = await requestWithAuth("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: COMPASS_OWNER,
    repo: COMPASS_FRONTEND_REPO,
    issue_number: pullRequestId
  });

  if (data && data.body) {
    let m = data.body.match(/(http[^ ]+)/);
    if (m && m.length === 2) {
      return {url: m[1]};
    }
  }
}

const APPEND_PATH_MAP = [{prefix: ['DAP'], path: '/app/ads-center/digital/home'}]

exports.parse = async (pullRequestId) => {
  const demobox = await parseDemobox(pullRequestId);
  const jira = await parseJira(pullRequestId);
  if (jira && jira.url && demobox) {
    const paths = jira.url.split('/');
    const lastPath = paths[paths.length - 1];
    const prefix = lastPath && lastPath.split('-')[0];
    const append = APPEND_PATH_MAP.find(t => t.prefix == prefix);
    if (append) {
      demobox.url = urlUtil.resolve(demobox.url, append.path);
    } else {
      demobox.url = urlUtil.resolve(demobox.url, '/app/creative-studio/sign-center');
    }
  }
  return {
    demobox: demobox,
  };
};

exports.parseJira = parseJira;

exports.isPullRequest = (text) => {
  return text && text.trim().match(/^(PTAL|ptal):.+github.+/);
};

exports.getPullRequestId = (text) => {
  return text.match(/(PTAL|ptal):.+github.+?(\d+)/)[2];
};

exports.setQAVerifiedLabel = async (prId) => {
  await requestWithAuth('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
    owner: COMPASS_OWNER,
    repo: COMPASS_FRONTEND_REPO,
    issue_number: prId,
    labels: ['QA-Verified']
  });
};
