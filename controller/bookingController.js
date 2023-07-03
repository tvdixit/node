const Booking = require("../model_Schema/bookingModel");
const jwt = require("jsonwebtoken")

const createBooking = async (req, res) => {
    try {
        const bookingdata = new Booking({
            event: req.body.event,
            user: req.body.user
        })
        const token = jwt.sign({ data }, 'your_secret_key');
        const savedDetail = await bookingdata.save();
        const eventdata = await Booking.findByIdAndUpdate(req.body, { Event: savedDetail.id }, { User: savedDetail.id });
        res.status(200).json({ savedDetail, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// booking data
const BookingData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, 'your_secret_key');
        const data = await Booking.findById(req.params.id).populate("event").populate({
            path: 'user',
            populate: {
                path: 'personalDetail'
            }
        });
        res.json({ success: true, message: "retrive data successfully", data, token })
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
module.exports = {
    createBooking,
    BookingData,
    bookingFilterData,
    UpdateBooking
}