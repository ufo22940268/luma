const {COMPASS_FRONTEND_REPO} = require("../constants");
const {COMPASS_OWNER} = require("../constants");
require('dotenv').config();
const {request} = require("@octokit/request");

const privateKey = process.env.GITHUB_PRIVATE_KEY;
let requestWithAuth = exports.requestWithAuth = request.defaults({
  headers: {
    authorization: `token ${privateKey}`,
  },
});


exports.getRecentCompletedPullRequest = async () => {
  let newVar = await requestWithAuth('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: COMPASS_OWNER,
    repo: COMPASS_FRONTEND_REPO,
    issue_number: "43089"
  });
  console.log('newVar: ' + JSON.stringify(newVar, null, 4) + '\n');
};
