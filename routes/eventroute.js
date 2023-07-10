const express = require('express');
const router = express.Router();

const { createEvent, EventData, UpdateEvent, verifyToken, decodetoken, deleteEventData } = require("../controller/eventController");

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
module.exports = {
    route: router
};