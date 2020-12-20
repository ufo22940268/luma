const {requestWithAuth} = require("./api");

const owner = "UrbanCompass";
const repo = "uc-frontend";

function parseUrlFromBody(body) {
  return body.match(/\((http:.+)\)/)[1];
}

async function parseDemobox(pullRequestId) {
  const {data} = await requestWithAuth("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
    owner,
    repo,
    issue_number: pullRequestId
  });
  const comment = data.find(t => t.body.includes('Demobox Link'));
  if (!comment) {
    return;
  }

  const {body} = comment;
  const url = parseUrlFromBody(body);
  return {url};
}

async function parseJira(pullRequestId) {
  const {data} = await requestWithAuth("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner,
    repo,
    issue_number: pullRequestId
  });

  if (data && data.body) {
    let m = data.body.match(/(http[^ ]+)/);
    if (m && m.length === 2) {
      return {url: m[1]};
    }
  }
}

exports.parse = async (pullRequestId) => {
  return {
    demobox: await parseDemobox(pullRequestId),
    jira: await parseJira(pullRequestId),
  };
};

exports.isPullRequest = (text) => {
  return text && text.match(/(PTAL|ptal):.+github.+/);
};

exports.getPullRequestId = (text) => {
  return text.match(/(PTAL|ptal):.+github.+?(\d+)/)[2];
};

exports.setQAVerifiedLabel = async () => {

};
