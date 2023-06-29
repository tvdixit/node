const Userstatus = require("../model_Schema/taskModel")

// UserStatusSchema :
const Status = async (req, res) => {
    try {
        const userdata = new Userstatus({
            first_name: req.body.first_name,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date,
            user_id: req.body.user_id,
        })
        const savedData = await userdata.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//User data get:
const StatusData = async (req, res) => {
    try {
        const data = await Userstatus.findById(req.params.id).populate("user_id").populate({
            path: 'user_id',
            populate: {
                path: "createdEvent",
            }
        }).populate({
            path: 'user_id',
            populate: {
                path: "personalDetail",
            }
        });
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Update UserStatus DATA :
const UpdateStatusData = async (req, res) => {
    try {
        const updatedData = req.body
        await Userstatus.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await Userstatus.findById(data._id).populate("user_id").populate({
                    path: 'user_id',
                    populate: {
                        path: "createdEvent",
                    }
                }).populate({
                    path: 'user_id',
                    populate: {
                        path: "personalDetail",
                    }
                });
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// aggregate match status :
const statusMatch = async (req, res) => {
    try {
        Userstatus.aggregate([
            { $match: { status: req.body.status } },
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// aggragation lookup -- 
const taskLookup = async (req, res) => {
    try {
        const data = await Userstatus.aggregate([
            { $lookup: { from: "users", localField: "first_name", foreignField: "first_name", as: "user" } },
        ])
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// aggregation looksup and use ne means not equal :
const tasknelookup = async (req, res) => {
    try {
        const data = await Userstatus.aggregate([
            { $lookup: { from: "users", localField: "first_name", foreignField: "first_name", as: "user" } },
            { $match: { "user": { $ne: [] } } }
        ])
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    Status,
    StatusData,
    UpdateStatusData,
    statusMatch,
    taskLookup,
    tasknelookup
}