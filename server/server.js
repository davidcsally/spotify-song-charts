'use strict'

const express = require('express');
const path = require('path');

const server = express();
const spotifyWhisperer = require('./scraper');

var port = process.env.PORT || 3000;

// allow CORs
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.get('/spotGlobal',
  (req, res, next) => {
    req.locals = {};
    req.locals.url = 'https://spotifycharts.com/regional/global/daily/latest'
    next();
  },
  spotifyWhisperer.getSpotGlobal
);

server.get('/spotUS',
  (req, res, next) => {
    req.locals = {};
    req.locals.url = 'https://spotifycharts.com/regional/us/daily/latest'
    next();
  },
  spotifyWhisperer.getSpotGlobal
);

server.get('/spotJapan',
  (req, res, next) => {
    req.locals = {};
    req.locals.url = 'https://spotifycharts.com/regional/jp/daily/latest'
    next();
  },
  spotifyWhisperer.getSpotGlobal
);

server.get('/spotArgentina',
  (req, res, next) => {
    req.locals = {};
    req.locals.url = 'https://spotifycharts.com/regional/ar/daily/latest'
    next();
  },
  spotifyWhisperer.getSpotGlobal
);

// serve index page
server.get('/', 
(req, res, next) => {
  console.log('serving index...');
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
  server.use(express.static(path.join(__dirname, '../build')));
});

server.listen(port);

module.exports = server;
