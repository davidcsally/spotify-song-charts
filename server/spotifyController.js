const data = require('./data');

module.exports = {
  global: (req, res) => {
    if (data.global) return res.json(data.global);
    return console.log('[/spotGlobal]error');
  },
  us: (req, res) => {
    if (data.us) return res.json(data.us);
    return console.log('error');
  },
  japan: (req, res) => {
    if (data.japan) return res.json(data.japan);
    return console.log('error');
  },
  argentina: (req, res) => {
    if (data.argentina) return res.json(data.argentina);
    return console.log('error');
  },
};

