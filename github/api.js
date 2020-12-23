const {COMPASS_FRONTEND_REPO} = require("../constants");
const {COMPASS_OWNER} = require("../constants");
require('dotenv').config();
const {request} = require("@octokit/request");
let sleep = require('sleep-promise');

const privateKey = process.env.GITHUB_PRIVATE_KEY;
let requestWithAuth = exports.requestWithAuth = request.defaults({
  headers: {
    authorization: `token ${privateKey}`,
  },
});


async function getRecentCompletedPullRequestOnPage(page) {
  let {data} = await requestWithAuth('GET /repos/{owner}/{repo}/pulls', {
    owner: COMPASS_OWNER,
    repo: COMPASS_FRONTEND_REPO,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
    per_page: 100,
    page
  });
  data = data.filter(t => t.user.login === 'ufo22940268').filter(t => !!t.merged_at);
  return data.map(t => ({url: t.html_url}));
}

exports.getRecentCompletedPullRequest = async () => {
  const pageCount = 1;
  let r = [];
  for (let i = 1; i <= pageCount; i++) {
    r = r.concat(await getRecentCompletedPullRequestOnPage(i));
  }
  return r;
};
