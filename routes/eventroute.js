const express = require('express');
const router = express.Router();

const { createEvent, EventData, UpdateEvent } = require("../controller/eventController");

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
module.exports = {
    route: router
};