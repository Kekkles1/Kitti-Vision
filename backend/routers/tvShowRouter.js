
const express = require("express");
const tvShowsControllers = require("../controllers/tvShowsControllers.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", tvShowsControllers.getAllTvShows);

module.exports = router;
