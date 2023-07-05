const express = require('express');
const router = express.Router();

const { createBooking, BookingData, bookingFilterData, UpdateBooking, verifyToken } = require("../controller/bookingController");

router.post(
    "/booking",
    createBooking
)
router.get(
    "/bookingdata/:id",
    BookingData
)
router.get(
    "/bookingfilter",
    bookingFilterData
)
router.patch(
    "/updateBooking",
    UpdateBooking
)
router.post(
    "/verifytoken",
    verifyToken,
)
module.exports = {
    route: router
};