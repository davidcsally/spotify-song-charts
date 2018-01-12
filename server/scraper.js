const cheerio = require('cheerio');
const request = require('request');

/**
 * Use spotifyWhisperer to scrape top 200 charts
 */
const spotifyWhisperer = {
  scrape: (url) => {
    request(url, (error, response, html) => {
      if (error) return console.log(error);
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
      return trackList;
    });
  },
};

module.exports = spotifyWhisperer;
