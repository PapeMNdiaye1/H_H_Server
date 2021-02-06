const mongoose = require("mongoose");

// ##########################################################
// const responseSchema = new mongoose.Schema({
//     authorId: {
//         type: String,
//         required: true,
//     },
//     responseAuthorName: {
//         type: String,
//         required: true,
//     },
//     responseAuthorPicture: {
//         type: String,
//         required: false,
//     },
//     response: {
//         type: String,
//         required: true,
//     },
//     responseDate: {
//         type: String,
//         required: true,
//     },
// });
// ##########################################################
const postSchema = new mongoose.Schema({
    postImage: {
        type: String,
        required: false,
    },
    postImageId: {
        type: String,
        required: false,
    },
    postAuthorId: {
        type: String,
        required: false,
    },
    postAuthorPicture: {
        type: String,
        required: false,
    },
    postAuthorName: {
        type: String,
        required: false,
    },
    postTitle: {
        type: String,
        required: false,
    },
    postBody: {
        type: String,
        required: false,
    },
    // postCategory: {
    //     type: String,
    //     required: false,
    // },
    postDate: {
        type: String,
        required: false,
    },
    timestamp: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Posts", postSchema);
