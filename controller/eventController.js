const Event = require("../model_Schema/EventModel");
const jwt = require("jsonwebtoken")

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
        const token = jwt.sign({ data }, 'your_secret_key');
        const savedDetail = await eventdata.save();
        console.log({ savedDetail, token });
        const data = await Event.findByIdAndUpdate(req.body.creator, { creator: savedDetail.id });
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get eventdata api
const EventData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, 'your_secret_key');
        const data = await Event.findById(req.params.id).populate("creator");
        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
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
module.exports = {
    createEvent,
    EventData,
    UpdateEvent
}