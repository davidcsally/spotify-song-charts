const https = require('https');

const TIMEOUT = 60000; // 1 min

const url = 'https://code-block.herokuapp.com/';
const serverPing = {
  keepAlive() {
    setInterval(() => {
      https.get(url);
    }, TIMEOUT * 5);
  },
};

module.exports = serverPing;

