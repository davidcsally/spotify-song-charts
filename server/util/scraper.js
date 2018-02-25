const cheerio = require('cheerio');
const request = require('request-promise');

/**
 * Use spotifyWhisperer to scrape top 200 charts
 */
const spotifyWhisperer = {
  scrape: (targetUrl) => {
    return request(targetUrl)
      .then((html) => {
        const $ = cheerio.load(html);
        let trackList = [];

        // iterate through all chartItems, extract data, and save to array
        $('tr').map((index, chartItem) => {
          const url = $(chartItem).children('td').children('a').attr('href');
          const img = $(chartItem).children('td').children('a').children('img').attr('src');
          const track = $(chartItem).children('td').children('strong').text();
          let artist = $(chartItem).children('td').children('span').text();

          // remove "by " from artist name
          artist = artist.substring(3);
          trackList.push({ artist, track, url, img });
        });
        trackList = trackList.slice(1); // first entry is junk
        // return data;
        return trackList;
      })
      .catch(err => console.log('err', err));
  },
};

module.exports = spotifyWhisperer;
