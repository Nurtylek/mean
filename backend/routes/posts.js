const express = require("express");
const multer = require("multer");
const isAuth = require("../middleware/check-auth");

const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});


router.post(
    "", isAuth,
    multer({ storage: storage }).single("image"),
    async (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file.filename,
            creator: req.userData.userId
        });
        try {
            const createdPost = await post.save();
            res.status(201).json({
                message: "Post created",
                post: {
                    ...createdPost._doc,
                    id: createdPost._id
                }
            })
        } catch (error) {
            res.status(500).json({
                message: "Creating a post failed!"
            })
        }
    }
);

router.put(
    "/:id", isAuth,
    multer({ storage: storage }).single("image"),
    async (req, res, next) => {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId
        });
        try {
            const result = await Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post);
            if (result.nModified > 0) {
                res.status(204).json({ message: "Updated successfully" })
            } else {
                res.status(401).json({message: "Auth failed"})
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't update post"
            })
        }
    }
);

router.get("", async (req, res, next) => {
    // req.query
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();

    if (pageSize && currentPage !== undefined) {
        postQuery.skip(pageSize * (currentPage - 1)) // 10 * (2-1)
            .limit(pageSize)
    }

    try {
        const docs = await postQuery;
        const count = await Post.countDocuments();
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: docs,
            maxPosts: count
        })
    } catch (error) {
        res.status(500).json({
            message: "Fetching posts failed!"
        })
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch (error) {
        res.status(500).json({
            message: "Fetching post failed!"
        })
    }
});

router.delete("/:id", isAuth, async (req, res, next) => {
    try {
        const result = await Post.remove({ _id: req.params.id, creator: req.userData.userId });
        if (result.n > 0) {
            res.status(204).json({ message: "Post deleted" })
        } else {
            res.status(401).json({message: "Auth failed"});
        }
    } catch (error) {
        res.status(500).json({
            message: "Couldn't delete post!"
        })
    }
});

module.exports = router;
