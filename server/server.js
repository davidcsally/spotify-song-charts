
const express = require('express');
const path = require('path');

const urls = require('./util/urls');
const spotifyWhisperer = require('./util/scraper');
const { keepAlive } = require('./util/serverPing');

keepAlive();
const server = express();

const port = process.env.PORT || 3111;
const FIVE_MINUTES = 300000;

// Serve the page
server.use(express.static(path.join(__dirname, '../build')));

// allow CORs
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// cache the data
const cache = {
  global: [],
  us: [],
  japan: [],
  argentina: [],
};

// fetch data every five minutes
spotifyWhisperer.scrape(urls.global)
  .then((res) => {
    cache.global = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.us)
  .then((res) => {
    cache.us = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.japan)
  .then((res) => {
    cache.japan = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.argentina)
  .then((res) => {
    cache.argentina = res;
    return null;
  })
  .catch(err => console.log('err', err));

setInterval(() => {
  // fetch data every five minutes
  spotifyWhisperer.scrape(urls.global)
    .then((res) => {
      cache.global = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.us)
    .then((res) => {
      cache.us = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.japan)
    .then((res) => {
      cache.japan = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.argentina)
    .then((res) => {
      cache.argentina = res;
      return null;
    })
    .catch(err => console.log('err', err));
}, FIVE_MINUTES);

// ROUTES for scrapes
server.get('/spotGlobal', (req, res) => {
  if (cache.global) return res.json(cache.global);
  return console.log('[/spotGlobal]error');
});

server.get(
  '/spotUS',
  (req, res) => {
    if (cache.us) return res.json(cache.us);
    return console.log('error');
  },
);

server.get(
  '/spotJapan',
  (req, res) => {
    if (cache.japan) return res.json(cache.japan);
    return console.log('error');
  },
);

server.get(
  '/spotArgentina',
  (req, res) => {
    if (cache.argentina) return res.json(cache.argentina);
    return console.log('error');
  },
);

// serve index page
server.get(
  '/',
  (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  },
);

server.listen(port, () => {
  console.log(`serving listening @port ${port}`);
});

module.exports = server;
