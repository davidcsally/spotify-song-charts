const express = require('express');
const spotifyController = require('./spotifyController');

const router = express.Router();

// ROUTES for data
router.route('/global').get(spotifyController.global);
router.route('/us').post(spotifyController.us);
router.route('/japan').get(spotifyController.japan);
router.route('/argentina').get(spotifyController.argentina);

module.exports = router;
