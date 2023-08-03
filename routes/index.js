const createUser = require("./user");
const createEvent = require("./eventroute");
const createBooking = require("./bookingroute");
const UserpersonalData = require("./personaldetailroute");
const UserTask = require("./taskroute");
const Review = require("./reviewroute");
const Order = require("./orderroute");
const Home = require("./homeroute")


module.exports = {
    createUser,
    createEvent,
    createBooking,
    UserpersonalData,
    UserTask,
    Review,
    Order,
    Home
};