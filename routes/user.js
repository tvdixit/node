const express = require('express');
const router = express.Router();

const { createUser, createEvent, createBooking, createDetail, UserData, EventData, BookingData, UserpersonalData,
    UpdateUser, UpdateEvent, UpdateBooking, UserSpecificData, UserFilterData, bookingFilterData, deleteUserData,
    UserMatch, UserLookup, Status, StatusData, UpdateStatusData } = require("../controller/userController")

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
router.post(
    "/addPersonaldetail",
    createDetail
)
router.get(
    "/userdata/:id",
    UserData
)
router.get(
    "/userspecificData/:id",
    UserSpecificData
)
router.get(
    "/userFilter",
    UserFilterData
)
router.get(
    "/eventdata/:id",
    EventData
)
router.get(
    "/bookingdata/:id",
    BookingData
)
router.get(
    "/bookingfilter",
    bookingFilterData
)
router.get(
    "/personalData/:id",
    UserpersonalData
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
router.delete(
    "/deleteUser/:id",
    deleteUserData
)
router.get(
    "/aggregate/matchuser",
    UserMatch
)
router.get(
    "/aggregate",
    UserLookup
)
router.post(
    "/create/status",
    Status
)
router.get(
    "/statusdata/:id",
    StatusData
)
router.patch(
    "/updatestatus",
    UpdateStatusData
)
module.exports = router;