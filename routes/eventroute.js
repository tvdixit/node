const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const { auth, verifyToken } = require("../midlware/auth")
const { createEvent, EventData, UpdateEvent, decodetoken, deleteEventData, createpost, EventpostData, like, Likedpost, likebyuser } = require("../controller/eventController");

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
router.post("/upload/image", Upload, async (req, res) => {
    res.status(200).send("file upload")
})
//
router.post(
    "/event",
    createEvent
)
router.get(
    "/eventdata/:id",
    EventData
)
router.patch(
    "/updateEvent",
    UpdateEvent
)
router.post(
    "/verifytoken",
    verifyToken,
)
router.post(
    "/decodetoken",
    decodetoken,
    EventData
)
router.delete(
    "/delete/:id",
    deleteEventData
)
router.post(
    "/create/post",
    Upload,
    createpost,
)
router.get(
    "/eventpost/detail/:id",
    EventpostData
)
router.post(
    "/like",
    like
)
router.get(
    "/liked/:id",
    Likedpost
)
router.post(
    "/like/:id",
    auth(),
    likebyuser,
)
module.exports = {
    route: router
};