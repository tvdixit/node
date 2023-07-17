const UserTask = require("../model_Schema/taskModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const pops = () => {
    populate({
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
}

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
        // const data = await UserTask.findById(req.params.id).populate("user_id")
        const token = jwt.sign({ savedData }, process.env.SECRET_KEY, { expiresIn: '2000s' });
        res.status(200).json({ savedData, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//User data get:
const TaskData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '2000s' });
        const data = await UserTask.findById(req.params.id).populate("user_id").populate({
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
        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Update UserStatus DATA :
const UpdateTaskData = async (req, res) => {
    try {
        const updatedData = req.body
        await UserTask.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await UserTask.findById(data._id).populate("user_id").populate({
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
//
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
        const user = await UserTask.findOne({ _id: data.userId }).populate("user_id")
        res.status(200).send({ data, user });
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

const deletetaskData = async (req, res) => {
    try {
        const data = await UserTask.findByIdAndDelete(req.params.id);
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
    decodetoken,
    deletetaskData
}

