'use strict';

const cheerio = require('cheerio');
const request = require('request');

const FIVE_MIN = 300000;

const spotifyWhisperer = {

  cache: {},

  getSpotGlobal: (req, res) => {
    request(req.locals.url, (error, response, html) => {
      console.log('#getSpotGlobal -> request');
      console.log(`URL: ${req.locals.url}`);
      const reqURL = req.locals.url;
      if (error) return console.log(error);

      const currentTime = Date.now();

      // check if cached key exists...
      if (spotifyWhisperer.cache[reqURL] && spotifyWhisperer.cache[reqURL].timeStamp) {
        // check age of cached object
        const timeStamp = spotifyWhisperer.cache[reqURL].timeStamp;

        // if data is less than 5 mins old, return cache
        if (timeStamp + FIVE_MIN >= currentTime) {
          console.log(`sending cache of: ${reqURL}`);
          return res.json(spotifyWhisperer.cache[reqURL].trackList);
        } console.log('cache too old');
      } else console.log('no cache');

      // scrape the URL
      const $ = cheerio.load(html);
      let trackList = [];

      // iterate through all chartItems, extract data, and save to array
      $('tr').map((index, chartItems) => {
        const url = $(chartItems).children('td').children('a').attr('href');
        const img = $(chartItems).children('td').children('a').children('img').attr('src');
        const track = $(chartItems).children('td').children('strong').text();
        let artist = $(chartItems).children('td').children('span').text();

        // remove "by " from artist name
        artist = artist.substring(3);
        trackList.push({ artist, track, url, img });
      });
      trackList = trackList.slice(1);

      // save and send cache;
      spotifyWhisperer.cache[reqURL] = { trackList, timeStamp: currentTime };
      res.json(spotifyWhisperer.cache[reqURL].trackList);
    });
  },
};

module.exports = spotifyWhisperer;
