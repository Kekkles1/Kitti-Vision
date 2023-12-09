
const express = require("express");
const adminsController = require("../controllers/adminsController.js");
const bodyParser = require('body-parser');

const router = express.Router();

router.get("/", adminsController.getAllAdmins);
router.post("/AddNewAdmin",adminsController.AddNewAdmin);
router.get("/GetAllUsers",adminsController.getAllUsers);
router.post("/AddNewShow",adminsController.AddNewShow);
router.delete("/DeleteAdminID",adminsController.DeleteAdminID);
router.delete("DeleteUserID",adminsController.DeleteUserID);
router.post("/AddNewEpisode",adminsController.AddNewEpisode);
router.get("/getAllEpisodes",adminsController.getAllEpisodes);

module.exports = router;
