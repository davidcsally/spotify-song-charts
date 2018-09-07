
const path = require('path');
const express = require('express');

const urls = require('./util/urls');
const data = require('./data');
const routes = require('./routes');
const spotifyWhisperer = require('./util/scraper');
const { keepAlive } = require('./util/serverPing');

// keepAlive(); // ping my other heroku app to keep them alive 😬
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

// ROUTES for data
server.use('/songs', routes);

// fetch data every five minutes
spotifyWhisperer.scrape(urls.global)
  .then((res) => {
    data.global = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.us)
  .then((res) => {
    data.us = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.japan)
  .then((res) => {
    data.japan = res;
    return null;
  })
  .catch(err => console.log('err', err));

spotifyWhisperer.scrape(urls.argentina)
  .then((res) => {
    data.argentina = res;
    return null;
  })
  .catch(err => console.log('err', err));

setInterval(() => {
  // fetch data every five minutes
  spotifyWhisperer.scrape(urls.global)
    .then((res) => {
      data.global = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.us)
    .then((res) => {
      data.us = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.japan)
    .then((res) => {
      data.japan = res;
      return null;
    })
    .catch(err => console.log('err', err));

  spotifyWhisperer.scrape(urls.argentina)
    .then((res) => {
      data.argentina = res;
      return null;
    })
    .catch(err => console.log('err', err));
}, FIVE_MINUTES);

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
