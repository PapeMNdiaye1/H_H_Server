const express = require("express");
const router = express.Router();
const UsersCtrl = require("./Controllers/UsersCONTROLLERS");
// ############################################
router.post("/signUp", UsersCtrl.signUp);
// ############################################
router.post("/login", UsersCtrl.login);
// ############################################
router.get("/get-user-infos/:UserEmail", UsersCtrl.getUserInfos);

module.exports = router;