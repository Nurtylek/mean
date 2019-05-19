const express = require("express");
const isAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/posts");
const router = express.Router();
const extractFile = require("../middleware/file");

router.post("", isAuth, extractFile, PostsController.createPost);
router.put("/:id", isAuth, extractFile, PostsController.updatePost);
router.get("", PostsController.getPosts);
router.get("/:id", PostsController.getPost);
router.delete("/:id", isAuth, PostsController.deletePost);

module.exports = router;
