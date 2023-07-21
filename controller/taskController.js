const UserTask = require("../model/taskModel")
const dotenv = require("dotenv");
dotenv.config();

// UserStatusSchema :
const Status = async (req, res) => {
    try {
        const userdata = new UserTask({
            first_name: req.body.first_name,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date,
            user_id: req.body.user_id,
        })
        const savedData = await userdata.save();
        res.status(200).json({ savedData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//User data get:
const TaskData = async (req, res) => {
    try {
        const data = await UserTask.findOne({ user_id: req.user.user_id }).populate("user_id").populate({
            path: 'user_id',
            populate: {
                path: "createdEvent",
            }
        }).populate({
            path: 'user_id',
            populate: {
                path: "personalDetail",
            }
        })
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Update UserStatus DATA :
const UpdateTaskData = async (req, res) => {
    try {
        const data = await UserTask.findOne({ user_id: req.user.user_id })
            .populate("user_id").populate({
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
        data.set(req.body);
        const updatedUser = await data.save();
        res.send({ updatedUser })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// aggregate match status :
const statusMatch = async (req, res) => {
    try {
        UserTask.aggregate([
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
        const data = await UserTask.aggregate([
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
        const data = await UserTask.aggregate([
            { $lookup: { from: "users", localField: "first_name", foreignField: "first_name", as: "user" } },
            { $match: { "user": { $ne: [] } } }
        ])
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// delete task data :
const deletetaskData = async (req, res) => {
    try {
        const data = await UserTask.findOneAndDelete({ user_id: req.user.user_id });
        res.json({ success: true, message: "delete data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    Status,
    TaskData,
    UpdateTaskData,
    statusMatch,
    taskLookup,
    tasknelookup,
    deletetaskData
}

