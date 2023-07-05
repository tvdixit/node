const express = require('express');
const router = express.Router();

const { createBooking, BookingData, bookingFilterData, UpdateBooking } = require("../controller/bookingController");

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
module.exports = {
    route: router
};