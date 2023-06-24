const User = require("../model_Schema/userModel");
const Event = require("../model_Schema/EventModel");
const Booking = require("../model_Schema/bookingModel");

// User :
const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const userdata = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            createdEvent: req.body.createdEvent,

        })
        const savedDetail = await userdata.save();
        const data = await User.findByIdAndUpdate(req.body.createdEvent, { createdEvent: savedDetail.id });
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Event:
const createEvent = async (req, res) => {
    try {
        const eventdata = new Event({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            date: req.body.date,
            creator: req.body.creator,
        })
        const savedDetail = await eventdata.save();
        console.log(savedDetail);
        const data = await Event.findByIdAndUpdate(req.body.creator, { creator: savedDetail.id });
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Booking :
const createBooking = async (req, res) => {
    try {
        const bookingdata = new Booking({
            event: req.body.event,
            user: req.body.user
        })
        const savedDetail = await bookingdata.save();
        const eventdata = await Booking.findByIdAndUpdate(req.body, { Event: savedDetail.id }, { User: savedDetail.id });
        // const userdetail = await Booking.findByIdAndUpdate(req.body.User, { User: savedDetail.id });
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get Userdata api :
const UserData = async (req, res) => {
    try {
        const data = await User.findById(req.params.id).populate("createdEvent");
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get eventdata api
const EventData = async (req, res) => {
    try {
        const data = await Event.findById(req.params.id).populate("creator");
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// get Booking api :
const BookingData = async (req, res) => {
    try {
        const data = await Booking.findById(req.params.id).populate("event").populate("user")
        res.json(data)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//update User api :
const UpdateUser = async (req, res) => {
    try {
        const updatedData = req.body
        await User.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await User.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update Event api :
const UpdateEvent = async (req, res) => {
    try {
        const updatedData = req.body
        await Event.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await Event.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
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
    createUser,
    createEvent,
    createBooking,
    UserData,
    EventData,
    BookingData,
    UpdateUser,
    UpdateEvent,
    UpdateBooking
}
