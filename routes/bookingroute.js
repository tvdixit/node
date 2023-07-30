const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');

const { bookingvalidation, useridvalidation, UpdatebookingValidation } = require("../validation/booking_validation")
const { auth } = require("../midlware/auth")
const { createBooking, BookingData, bookingFilterData, UpdateBooking, deleteBookingData } = require("../controller/bookingController");

router
    .post("/add/booking", validate(bookingvalidation), createBooking)
    .get("/bookingdata", auth(), validate(useridvalidation), BookingData)
    .get("/bookingfilter", bookingFilterData)
    .patch("/updateBooking", auth(), validate(UpdatebookingValidation), UpdateBooking)
    .delete("/delete", auth(), validate(useridvalidation), deleteBookingData)

module.exports = {
    route: router
};