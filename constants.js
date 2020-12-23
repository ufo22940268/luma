exports.VERIFIED_EMOJI = ['male-doctor',
  'female-doctor',];
exports.ALLOWED_USERS = ['U01EJL92F0F'];

const devLuma = '<@U01J03EMAJU>';
const productionLuma = '<@U01GV0GTQG7>';
const inDevOrTest = ['development', 'test'].includes(process.env.NODE_ENV);
exports.LUMA_NAME = inDevOrTest ? devLuma : productionLuma;

exports.COMPASS_OWNER = "UrbanCompass";
exports.COMPASS_FRONTEND_REPO = "uc-frontend";

const dev_slack_channels = ['C01HAE5R72P'];
const production_slack_channels = [''];
exports.SLACK_CHANNELS = inDevOrTest ? dev_slack_channels : production_slack_channels;
