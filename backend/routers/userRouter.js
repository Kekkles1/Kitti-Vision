
const express = require("express");
const usersController = require("../controllers/usersController.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.post("/AddNewUser",usersController.AddNewUser);
router.get("/GetAllTvShows",usersController.getAllTvShows);
router.get("/GetAllEpisodes",usersController.getAllEpisodes);
router.get("/GetAllWatchlists",usersController.getAllWatchlists);
router.get("/GetAllReviews",usersController.getAllReviews);
router.post("/AddReview",usersController.AddReview);
router.get("/GetShowName/:id",usersController.GetShowName);
router.get("/UsernameCheck/:username",usersController.UsernameCheck);
router.get("/PasswordCheck/:password",usersController.PasswordCheck);

module.exports = router;
