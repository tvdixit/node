const express = require('express');
const router = express.Router();

const { createBooking, BookingData, bookingFilterData, UpdateBooking, verifyToken, decodetoken, deleteBookingData } = require("../controller/bookingController");

router.post(
    "/add/booking",
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
router.post(
    "/decodetoken",
    decodetoken,
    BookingData
)
router.delete(
    "/delete/:id",
    deleteBookingData
)
module.exports = {
    route: router
};