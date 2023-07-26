const Booking = require("../model/bookingModel");
const dotenv = require("dotenv");
dotenv.config();


// create booking detail : 
const createBooking = async (req, res) => {
    try {
        const { event, user } = req.body;
        const existingUser = await Booking.findOne({ event, user });
        if (existingUser) {
            return res.status(409).json({ message: "event or user already taken." });
        }
        const bookingdata = new Booking({
            event: req.body.event,
            user: req.body.user
        })
        const savedDetail = await bookingdata.save();
        res.status(200).json({ savedDetail });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// booking data
const BookingData = async (req, res) => {
    try {
        const data = await Booking.findOne({ user: req.user.user_id }).populate("event").populate({
            path: 'user',
            populate: {
                path: 'personalDetail'
            }
        });
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get booking all data filter :
const bookingFilterData = async (req, res) => {
    try {
        const data = await Booking.find().populate("event", { date: 1, price: 1, title: 1 }).populate("user", { first_name: 1, last_name: 1 });
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Update Booking api :
const UpdateBooking = async (req, res) => {
    try {
        // const updatedData = req.body
        const data = await Booking.findOne({ user: req.user.user_id })
        data.set(req.body);
        const updatedUser = await data.save();
        res.send({ updatedUser })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// delete Bookingdata :
const deleteBookingData = async (req, res) => {
    try {
        const data = await Booking.findOneAndDelete({ user: req.user.user_id });
        res.json({ success: true, message: "delete data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    createBooking,
    BookingData,
    bookingFilterData,
    UpdateBooking,
    deleteBookingData
}