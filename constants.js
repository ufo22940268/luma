exports.VERIFIED_EMOJI = ['male-doctor',
  'female-doctor',];
exports.ALLOWED_USERS = ['U01EJL92F0F'];

const devLuma = '<@U01J03EMAJU>';
const productionLuma = '<@U01GV0GTQG7>';
const inDevOrTest = ['development', 'test'].includes(process.env.NODE_ENV);
exports.LUMA_NAME = inDevOrTest ? devLuma : productionLuma;

exports.COMPASS_OWNER = "UrbanCompass";
exports.COMPASS_FRONTEND_REPO = "uc-frontend";

let LUMA_BOT_CHANNEL = 'C01H9RJ4518';
const LUMA_DEV_BOT_CHANNEL = 'C01HAE5R72P';
const AOLIGEI_PR_CHANNEL = 'C01HDBH38SG';
const DEV_SLACK_CHANNELS = [LUMA_DEV_BOT_CHANNEL];
const PRODUCTION_SLACK_CHANNELS = [LUMA_BOT_CHANNEL, AOLIGEI_PR_CHANNEL];
exports.SLACK_CHANNELS = inDevOrTest ? DEV_SLACK_CHANNELS : PRODUCTION_SLACK_CHANNELS;
