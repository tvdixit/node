const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

// User :
const createUser = async (req, res) => {
    try {
        const userdata = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            createdEvent: req.body.createdEvent,
            personalDetail: req.body.personalDetail,
        })
        const savedDetail = await userdata.save();
        res.status(200).json({ savedDetail })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// login APi : 
const Userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = jwt.sign({ email, password }, process.env.SECRET_KEY, { expiresIn: '20000s' });
        const users = await User.findOne({ email, password })
        if (!users) {
            return res.status(401).json("invalid email or password")
        }
        res.status(200).json({ users, token })
    } catch (err) {
        res.status(400).json("Error")
        console.log(err);
    }
};

// // get Userdata api:
const UserData = async (req, res) => {
    try {
        const data = await User.findById(req.params.id).populate("createdEvent").populate("personalDetail");
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// decode token api :
const decodeToken = async (req, res) => {
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
        const user = await User.findOne({ _id: data.userId })
        res.status(200).send({ data, user });
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
// get user api using filter :
const UserSpecificData = async (req, res) => {
    try {
        const data = await User.findById(req.params.id, { first_name: 1, last_name: 1 }).populate("createdEvent", { title: 1 });
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//get users all data filter api :
const UserFilterData = async (req, res) => {
    try {
        const data = await User.find(req.User, { first_name: 1, last_name: 1 }).populate("createdEvent", { date: 1, price: 1, title: 1 });
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get personal information :
const UserpersonalData = async (req, res) => {
    try {
        const data = await personalData.findById(req.params.id);
        res.json({ success: true, message: "retrive data successfully", data })
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
// Delete User single Data by id api :
const deleteUserData = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "delete data successfully", data })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// aggregation UserMatch:
const UserMatch = async (req, res) => {
    try {
        User.aggregate([
            { $match: { first_name: "Neel" } },
            { $group: { _id: "first_name", sameNameUser: { $sum: 1 } } },
            { $sort: { totalUsersAges: -1 } }
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//aggragation lookup :
const UserLookup = async (req, res) => {
    try {
        User.aggregate([
            { $lookup: { from: "events", localField: "createdEvent", foreignField: "_id", as: "EventData" } },
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    createUser,
    Userlogin,
    UserData,
    decodeToken,
    UserpersonalData,
    UpdateUser,
    UserSpecificData,
    UserFilterData,
    deleteUserData,
    UserMatch,
    UserLookup
}
