const createUser = require("./user");
const createEvent = require("./eventroute");
const createBooking = require("./bookingroute");
const UserpersonalData = require("./personaldetailroute");
const UserTask = require("./taskroute");

module.exports = {
    createUser,
    createEvent,
    createBooking,
    UserpersonalData,
    UserTask
};