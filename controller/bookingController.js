const Booking = require("../model/bookingModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


// create booking detail : 
const createBooking = async (req, res) => {
    try {
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
        const data = await Booking.findById(req.params.id).populate("event").populate({
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
        const updatedData = req.body
        await Booking.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await Booking.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// decode token : 
const decodetoken = async (req, res) => {
    const authHeader = req.header("authorization");
    if (!authHeader) {
        return res.status(401).send({ error: "No token provided." });
    }
    const [authType, token] = authHeader.split(" ");
    if (authType !== "Bearer" || !token) {
        return res.status(401).send({ error: "Invalid token format." });
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Booking.findOne({ _id: data.userId }).populate("event").populate({
            path: 'user',
            populate: {
                path: 'personalDetail'
            }
        })
        res.status(200).send({ data, user });
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

// delete Bookingdata :
const deleteBookingData = async (req, res) => {
    try {
        const data = await Booking.findByIdAndDelete(req.params.id);
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
    decodetoken,
    deleteBookingData
}