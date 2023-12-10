
const express = require("express");
const adminsController = require("../controllers/adminsController.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", adminsController.getAllAdmins);                     //wokrs
router.post("/AddNewAdmin",adminsController.AddNewAdmin);           //works
router.get("/GetAllUsers",adminsController.getAllUsers);            //works
router.post("/AddNewShow",adminsController.AddNewShow);             //works
router.delete("/DeleteAdminID",adminsController.DeleteAdminID);     //works
router.delete("/DeleteUserID",adminsController.DeleteUserID);       //doesnt work
router.post("/AddNewEpisode",adminsController.AddNewEpisode);
router.get("/getAllEpisodes",adminsController.getAllEpisodes);              //doesnt work
router.get("/AdminUsernameCheck",adminsController.AdminUsernameCheck);      //works
router.get("/AdminPasswordCheck",adminsController.AdminPasswordCheck);      //works

module.exports = router;
