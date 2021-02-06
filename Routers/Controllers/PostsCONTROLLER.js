const Posts = require("../../Models/PostModel");
// ############################################
exports.creatPost = async (req, res) => {
    const post = await new Posts({
        postImage: req.body.PostImageURL,
        postAuthorId: req.body.PostAuthorId,
        postAuthorPicture: req.body.PostAuthorPicture,
        postAuthorName: req.body.PostAuthorName,
        postTitle: req.body.PostTitle,
        postBody: req.body.PostBody,
        postCategory: req.body.PostCategory,
        postDate: req.body.PostDate,
        timestamp: req.body.Timestamp,
    });
    post
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({ postIsCreated: true });
        })
        .catch((error) => {
            // console.error(error.code);
            res.status(400).json({ postIsCreated: false });
        });
};
// ############################################
exports.getLastPost = (req, res) => {
    Posts.find()
        .sort({ timestamp: -1 })
        .limit(5)
        .then((allPosts) => {
            if (allPosts) {
                res.status(200).json({ allPosts });
            } else {
                res.status(404).json({ allPosts: "db is empty" });
            }
        })
        .catch((err) => {
            res.status(500).json({ messages: err.message });
        });
};