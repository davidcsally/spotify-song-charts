
const express = require('express');
const path = require('path');

const server = express();
const urls = require('./urls');
const spotifyWhisperer = require('./scraper');

const port = process.env.PORT || 3000;
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
// TODO fix this, return a promise
cache.global = spotifyWhisperer.scrape(urls.global);
cache.us = spotifyWhisperer.scrape(urls.us);
cache.japan = spotifyWhisperer.scrape(urls.japan);
cache.argentina = spotifyWhisperer.scrape(urls.argentina);
setInterval(() => {
  cache.global = spotifyWhisperer.scrape(urls.global);
  cache.us = spotifyWhisperer.scrape(urls.us);
  cache.japan = spotifyWhisperer.scrape(urls.japan);
  cache.argentina = spotifyWhisperer.scrape(urls.argentina);
}, FIVE_MINUTES);

setTimeout(() => {
  console.log(cache);
}, 5000);

// ROUTES for scrapes
server.get('/spotGlobal', (req, res) => {
  console.log('cache?', cache);
  console.log('global', cache.global);
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
