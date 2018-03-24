const blacklist = require('metro/src/blacklist')

module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  }
}

/*
      // RN 0.52 FIX
      mres.setHeader("Access-Control-Allow-Origin", "*");
      // RN 0.52 FIX
*/
