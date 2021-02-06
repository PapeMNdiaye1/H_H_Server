require('dotenv').config()
const { APP_PORT, NODE_ENV, MY_DATABASE_URL } = process.env
//_______________________
//? UPLOAD init
const path = require("path");
const multer = require('multer');
const crypto = require("crypto");
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
//_______________________
//? EXPRESS init
const express = require("express");
const app = express();
// this is for parsing the JSON sended in Post method
const bodyParser = require("body-parser")
app.use(bodyParser.json())
// ?######################################################################################
// ?######################################################################################
//? MONGODB init
const mongoose = require("mongoose");
mongoose.connect(MY_DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

const conn = mongoose.connection;

conn.on("error", (error) => {
    console.log(error);
});
// Init gfs
let gfs;
conn.once("open", () => {
    console.log("db Connected");
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});
// ?######################################################################################
// ?######################################################################################
// Create storage engine
const storage = new GridFsStorage({
    url: MY_DATABASE_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads",
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });
// ?#####################################################################################
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.json({ file: req.file });
});
// ###########################################
// ###########################################
app.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                file: "No file exists",
            });
        }
        if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png" ||
            file.contentType === "image/gif"
        ) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                file: "Not an image",
            });
        }
    });
});
// ##########################################
app.delete("/files/:id", (req, res) => {
    // console.log(req.params.id);
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        } else {
            // console.log("picture Deleted");
            return res.status(201).json({ message: true });
        }
    });
});
// ?######################################################################################
// ?######################################################################################

const UsersRouters = require("./Routers/UsersROUTERS");
app.use("/Users", UsersRouters);
const PostsRouters = require("./Routers/PostsROUTERS");
app.use("/Posts", PostsRouters);


// ?######################################################################################
// ?######################################################################################

if (process.env.NODE_ENV === "production") {
    app.listen(APP_PORT, () => {
        console.log('### Code for production');
        console.log(`[Server] in ${NODE_ENV} on port ${APP_PORT}`);
    });
}
else if (NODE_ENV === "test") {
    console.log(`[express]in test on ${APP_PORT}`);
    let server = app.listen(APP_PORT, () => {
        console.log('### Code for production');
        console.log(`[Server] in ${NODE_ENV} on port ${APP_PORT}`);
    });
    module.exports = server
}
else {
    app.listen(APP_PORT, () => {
        console.log(`[Server] in ${NODE_ENV} on port ${APP_PORT}`);
    });
}





