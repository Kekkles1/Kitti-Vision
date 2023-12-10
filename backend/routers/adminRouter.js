
const express = require("express");
const adminsController = require("../controllers/adminsController.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", adminsController.getAllAdmins);                         //wokrs
router.post("/AddNewAdmin",adminsController.AddNewAdmin);               //works
router.get("/GetAllUsers",adminsController.getAllUsers);                //works
router.post("/AddNewShow",adminsController.AddNewShow);                 //works
router.delete("/DeleteAdminID",adminsController.DeleteAdminID);         //works
router.delete("/DeleteUserID",adminsController.DeleteUserID);           //works
router.post("/AddNewEpisode",adminsController.AddNewEpisode);               //works
router.get("/getAllEpisodes",adminsController.getAllEpisodes);              //works (make sure u pass in the body tv_show_id)
router.get("/AdminUsernameCheck",adminsController.AdminUsernameCheck);      //works
router.get("/AdminPasswordCheck",adminsController.AdminPasswordCheck);      //works
router.get("/getDeletedHistory",adminsController.getDeletedHistory);
module.exports = router;
