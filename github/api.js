const {request} = require("@octokit/request");

const privateKey = process.env.GITHUB_PRIVATE_KEY;
exports.requestWithAuth = request.defaults({
  headers: {
    authorization: `token ${privateKey}`,
  },
});
