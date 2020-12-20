// Initialize using signing secret from environment variables
require('dotenv').config()
const {createEventAdapter} = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;
const {WebClient} = require('@slack/web-api');
const handleMessage = require('./eventHandler/handleMessage');
const handleReaction = require('./eventHandler/handleReaction');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  handleMessage(event);
});

// male-doctor
// female-doctor
slackEvents.on('reaction_added', (event) => {
  // console.log(`reaction Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  // handleReaction(event);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});
