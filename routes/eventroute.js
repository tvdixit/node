const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const validate = require('../midlware/validate');
const { eventvalidation, event_postvalidation, idSchema } = require("../validation/event_validation")

const { auth } = require("../midlware/auth")
const { createEvent, EventData, UpdateEvent, deleteEventData, createpost, EventpostData, AllLikedpost, Likedpost, likebyuser, UserLikedpost, PostLikedbyUser, AllEventData, LikeDatainPost } = require("../controller/eventController");
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
    .post("/event", validate(eventvalidation), createEvent)
    .get("/eventdata", auth(), EventData)
    .patch("/updateEvent", auth(), UpdateEvent)
    .delete("/delete", auth(), deleteEventData)
    .post("/create/post", Upload, validate(event_postvalidation), createpost)
    .get("/eventpost/detail", validate(idSchema), EventpostData)
    .get("/all/likeddata", AllLikedpost)
    .get("/liked", validate(idSchema), Likedpost)
    .post("/like", auth(), validate(idSchema), likebyuser)
    .get("/user/liked", validate(idSchema), UserLikedpost)
    .get("/likedpost", validate(idSchema), PostLikedbyUser)
    .get("/all/postdata", AllEventData, AllLikedpost)
    .get("/post/like/data", validate(idSchema), LikeDatainPost)
module.exports = {
    route: router
};