const express = require('express');
const router = express.Router();

const { createUser, createEvent, createBooking, UserData, EventData, BookingData, UpdateUser, UpdateEvent, UpdateBooking } = require("../controller/userController")

router.post(
    "/addDetail",
    createUser
)
router.post(
    "/event",
    createEvent
)
router.post(
    "/booking",
    createBooking
)
router.get(
    "/userdata/:id",
    UserData
)
router.get(
    "/eventdata/:id",
    EventData
)
router.get(
    "/bookingdata/:id",
    BookingData
)
router.patch(
    "/updateUser",
    UpdateUser
)
router.patch(
    "/updateEvent",
    UpdateEvent
)
router.patch(
    "/updateBooking",
    UpdateBooking
)
module.exports = router;