const Booking = require("../model_Schema/bookingModel");
const jwt = require("jsonwebtoken")
const secretKey = 'yourSecretKey';

const createBooking = async (req, res) => {
    try {
        const bookingdata = new Booking({
            event: req.body.event,
            user: req.body.user
        })
        const savedDetail = await bookingdata.save();
        // console.log(savedDetail);
        // const data = await Booking.findByIdAndUpdate(req.body.event, req.body.user, { Event: savedDetail.id, User: savedDetail.id });
        const token = jwt.sign({ savedDetail }, secretKey, { expiresIn: '2000s' });
        // console.log({ token });
        res.status(200).json({ savedDetail, token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// booking data
const BookingData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '2000s' });
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
const verifyToken = (req, res) => {
    try {
        const token = req.header("authorization");
        console.log(token)
        const verified = jwt.verify(token, secretKey);
        console.log(verified);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}

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
        const data = jwt.verify(token, secretKey);
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
    verifyToken,
    decodetoken,
    deleteBookingData
}