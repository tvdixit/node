const express = require('express');
const router = express.Router();

const { createEvent, EventData, UpdateEvent, verifyToken } = require("../controller/eventController");

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
module.exports = {
    route: router
};