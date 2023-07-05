const UserTask = require("../model_Schema/taskModel")
const jwt = require("jsonwebtoken")

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
        const token = jwt.sign({ data }, 'your_secret_key');
        const savedData = await userdata.save();
        res.status(200).json({ savedData, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//User data get:
const TaskData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, 'your_secret_key');
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
module.exports = {
    Status,
    TaskData,
    UpdateTaskData,
    statusMatch,
    taskLookup,
    tasknelookup
}

// const UserData = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const token = jwt.sign({ userId }, secretKey, { expiresIn: "300s" }, 'your_secret_key');
//         jwt.verify(token, secretKey, async (err, decode) => {
//             if (err) {
//                 if (err.name === 'TokenExpiredError') {
//                     res.status(200).json({ success: false, message: 'token expired' });
//                 } else {
//                     res.status(200).json({ success: false, message: 'invalid token' });
//                 }
//             } else {
//                 const data = await User.findById(userId).populate('createdEvent').populate('personalDetail');
//                 res.json({ success: true, message: 'retrieve data successfully', data, token });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };