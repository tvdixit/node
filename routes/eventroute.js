const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const { auth } = require("../midlware/auth")
const { createEvent, EventData, UpdateEvent, deleteEventData, createpost, EventpostData, AllLikedpost, like, Likedpost, likebyuser, UserLikedpost, PostLikedbyUser, AllEventData, LikeDatainPost } = require("../controller/eventController");

const Upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload/image')
        },
        filename: (req, file, cb) => {
            const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
            const fileName = `${uuidv4()}${fileExtName}`;
            console.log(fileName);
            cb(null, fileName);
        }
    })
}).array('image', 5)
router
    .post("/upload/image", Upload, async (req, res) => {
        res.status(200).send("file upload")
    })
    .post("/event", createEvent)
    .get("/eventdata", auth(), EventData)
    .patch("/updateEvent", auth(), UpdateEvent)
    .delete("/delete", auth(), deleteEventData)
    .post("/create/post", Upload, createpost)
    .get("/eventpost/detail/:id", EventpostData)
    .get("/all/likeddata", AllLikedpost)
    .post("/like", like)
    .get("/liked/:id", Likedpost)
    .post("/like/:id", auth(), likebyuser)
    .get("/user/liked/:id", UserLikedpost)
    .get("/likedpost/:id", PostLikedbyUser)
    .get("/all/postdata", AllEventData, AllLikedpost)
    .get("/post/like/data/:id", LikeDatainPost)
module.exports = {
    route: router
};