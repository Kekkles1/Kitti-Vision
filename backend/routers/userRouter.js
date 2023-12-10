
const express = require("express");
const usersController = require("../controllers/usersController.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", usersController.getAllUsers);           //works
router.post("/AddNewUser",usersController.AddNewUser);  //works
router.get("/GetAllTvShows",usersController.getAllTvShows);     //works
router.get("/GetAllEpisodes",usersController.getAllEpisodes);       //doesnt work
router.get("/GetAllWatchlists",usersController.getAllWatchlists);   //works
router.get("/GetAllReviews",usersController.getAllReviews);         //works
router.post("/AddReview",usersController.AddReview);                //works
router.get("/GetShowName/:id",usersController.GetShowName);         //works
router.get("/UsernameCheck",usersController.UsernameCheck);         //WORKS
router.get("/PasswordCheck",usersController.PasswordCheck);         //works

module.exports = router;
