const express = require('express');
const router = express.Router();
const { auth } = require("../midlware/auth")
const { createBooking, BookingData, bookingFilterData, UpdateBooking, deleteBookingData } = require("../controller/bookingController");

router
    .post("/add/booking", createBooking)
    .get("/bookingdata", auth(), BookingData)
    .get("/bookingfilter", bookingFilterData)
    .patch("/updateBooking", auth(), UpdateBooking)
    .delete("/delete", auth(), deleteBookingData)
module.exports = {
    route: router
};