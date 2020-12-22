exports.VERIFIED_EMOJI = ['male-doctor',
  'female-doctor',];
exports.ALLOWED_USERS = ['U01EJL92F0F'];

const devLuma = '<@U01J03EMAJU>';
const productionLuma = '<@U01GV0GTQG7>';
exports.LUMA_NAME = ['development', 'test'].includes(process.env.NODE_ENV) ? devLuma : productionLuma;

exports.COMPASS_OWNER = "UrbanCompass";
exports.COMPASS_FRONTEND_REPO = "uc-frontend";
