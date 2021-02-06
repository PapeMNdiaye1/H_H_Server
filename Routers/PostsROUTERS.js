const express = require("express");
const router = express.Router();
const PostsCtrl = require("./Controllers/PostsCONTROLLER");
// ############################################
router.post("/creat-posts", PostsCtrl.creatPost);
// ############################################
router.get("/get-last-posts", PostsCtrl.getLastPost);

module.exports = router;