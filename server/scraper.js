const cheerio = require('cheerio');
const request = require('request');

const FIVE_MINUTES = 300000;

/**
 * Use spotifyWhisperer to scrape top 200 charts
 */
const spotifyWhisperer = {

  /**
   * store data in the cache and refresh every 5 minutes
   */
  cache: {},

  /**
   * scrapeCharts() - pass this function as middleware,
   * before invoking this function save a url in
   * req.locals.url to use as a scrape target
   *
   * THIS WILL END THE REQUEST
   */
  scapeCharts: (req, res) => {
    request(req.locals.url, (error, response, html) => {
      const { locals } = req;
      const { url } = locals;

      if (error) return console.log(error);

      const currentTime = Date.now();

      // check if cached key exists...
      if (spotifyWhisperer.cache[url] && spotifyWhisperer.cache[url].timeStamp) {
        const timeStamp = spotifyWhisperer.cache[url].timeStamp;

        // if data is less than 5 mins old, return cache
        if (timeStamp + FIVE_MINUTES >= currentTime) {
          console.log(`sending cache of: ${url}`);
          return res.json(spotifyWhisperer.cache[url].trackList);
        } console.log('cache too old');
      } else console.log('no cache');

      // otherwise scrape the URL
      const $ = cheerio.load(html);
      let trackList = [];

      // iterate through all chartItems, extract data, and save to array
      $('tr').map((index, chartItem) => {
        const urlz = $(chartItem).children('td').children('a').attr('href');
        const img = $(chartItem).children('td').children('a').children('img').attr('src');
        const track = $(chartItem).children('td').children('strong').text();
        let artist = $(chartItem).children('td').children('span').text();

        // remove "by " from artist name
        artist = artist.substring(3);
        trackList.push({ artist, track, urlz, img });
      });
      trackList = trackList.slice(1); // first entry is junk

      // save and send cache;
      spotifyWhisperer.cache[url] = { trackList, timeStamp: currentTime };
      res.json(spotifyWhisperer.cache[url].trackList);
    });
  },
};

module.exports = spotifyWhisperer;
