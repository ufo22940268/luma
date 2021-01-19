const JiraApi = require('jira-client');

module.exports = new JiraApi({
    protocol: 'https',
    host: 'compass-tech.atlassian.net',
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_TOKEN,
    apiVersion: '2',
    strictSSL: true
});
