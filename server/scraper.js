'use strict';

const cheerio = require('cheerio');
const request = require('request');

const spotifyWhisperer = {

  cache: {},

  getSpotGlobal: (req, res, next) => {
    request(req.locals.url, (error, response, html) => {
      console.log('#getSpotGlobal -> request');
      console.log(`URL: ${req.locals.url}`);
      const url = req.locals.url
      if (error) return console.log(error);      

      let currentTime = Date.now();
      const fiveMin = 300000;

      // check if cached key exists...
      if (spotifyWhisperer.cache[url]) {
        console.log('cache exists...')
        // check age of cached object
        if (spotifyWhisperer.cache[url].timeStamp) {
          let oldTime = spotifyWhisperer.cache[url].timeStamp;

          // if data is less than 5 mins old, return cache
          if (oldTime + fiveMin >= currentTime) {
            console.log(`sending cache of: ${url}`)
            return res.json(spotifyWhisperer.cache[url].trackList);
          } else console.log('cache too old');
        } else console.log('err with cache');
      } else console.log('no cache');
      
      // scrape the URL
      const $ = cheerio.load(html);
      let trackList = [];

      $('tr').map((index, element) => {

        const url = $(element).children('td').children('a').attr('href');
        const img = $(element).children('td').children('a').children('img').attr('src')
        const track = $(element).children('td').children('strong').text();
        let artist = $(element).children('td').children('span').text();

        artist = artist.substring(3);
        // console.log(`adding: ${artist}, ${track} \nurl: ${url} \nimg: ${img}`);
        trackList.push({ artist, track, url, img });
      });
      trackList = trackList.slice(1);

      // save and send cache;
      spotifyWhisperer.cache[url] = { trackList, timeStamp: currentTime };
      res.json(spotifyWhisperer.cache[url].trackList);
    });
  },
};

module.exports = spotifyWhisperer;
