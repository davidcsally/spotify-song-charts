'use strict';

const cheerio = require('cheerio');
const request = require('request');

const spotifyWhisperer = {

  getSpotGlobal: (req, res, next) => {  
    console.log(`URL: ${req.locals.url}`)
    request(req.locals.url, (error, response, html) => {
      console.log('#getSpotGlobal -> request');
      
      const $ = cheerio.load(html);
      if (error) return console.log(error);

      let trackList = [];

      $('tr').map((index, element) => {

        const url = $(element).children('td').children('a').attr('href');

        const img = $(element).children('td').children('a').children('img').attr('src')

        const track = $(element).children('td').children('strong').text();  // strong tag text
        
        const artist = $(element).children('td').children('span').text(); // get the nested <span> tag

        // console.log(`adding: ${artist}, ${track} \nurl: ${url} \nimg: ${img}`);
        trackList.push({ artist, track, url, img });
      });
      trackList = trackList.slice(1);
      res.json(trackList);
    });
  },

  // getSpotGlobal: (req, res, next) => {  
  //   request('https://spotifycharts.com/regional/global/daily/latest', (error, response, html) => {
  //     console.log('#getSpotGlobal -> request');
      
  //     const $ = cheerio.load(html);
  //     if (error) return console.log(error);

  //     let trackList = [];

  //     $('td[class=chart-table-track]').map((index, element) => {
  //       const track = $(element).children('strong').text();  // strong tag text
        
  //       const artist = $(element).children('span').text(); // get the nested <span> tag

  //       console.log(`adding: ${artist}, ${track}`);
  //       trackList.push({ artist, track });
  //     });
  //     res.json(trackList);
  //   });
  // },

  // getSpotUS: (req, res, next) => {  
  //   request('https://spotifycharts.com/regional/us/daily/latest', (error, response, html) => {
  //     console.log('#getSpotUS -> request');
      
  //     const $ = cheerio.load(html);
  //     if (error) return console.log(error);

  //     let trackList = [];

  //     $('td[class=chart-table-track]').map((index, element) => {
  //       const track = $(element).children('strong').text();  // strong tag text
        
  //       const artist = $(element).children('span').text(); // get the nested <span> tag

  //       console.log(`adding: ${artist}, ${track}`);
  //       trackList.push({ artist, track });
  //     });
  //     res.json(trackList);
  //   });
  // },

  // getJapan: (req, res, next) => {  
  //   request('https://spotifycharts.com/regional/jp/daily/latest', (error, response, html) => {
  //     console.log('#getSpotUS -> request');
      
  //     const $ = cheerio.load(html);
  //     if (error) return console.log(error);

  //     let trackList = [];

  //     $('td[class=chart-table-track]').map((index, element) => {
  //       const track = $(element).children('strong').text();  // strong tag text
        
  //       const artist = $(element).children('span').text(); // get the nested <span> tag

  //       console.log(`adding: ${artist}, ${track}`);
  //       trackList.push({ artist, track });
  //     });
  //     res.json(trackList);
  //   });
  // },

  // getArgentina: (req, res, next) => {  
  //   request('https://spotifycharts.com/regional/ar/daily/latest', (error, response, html) => {
  //     console.log('#getSpotUS -> request');
      
  //     const $ = cheerio.load(html);
  //     if (error) return console.log(error);

  //     let trackList = [];

  //     $('td[class=chart-table-track]').map((index, element) => {
  //       const track = $(element).children('strong').text();  // strong tag text
        
  //       const artist = $(element).children('span').text(); // get the nested <span> tag

  //       console.log(`adding: ${artist}, ${track}`);
  //       trackList.push({ artist, track });
  //     });
  //     res.json(trackList);
  //   });
  // },


};

module.exports = spotifyWhisperer;
