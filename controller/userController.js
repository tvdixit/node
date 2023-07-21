const dotenv = require("dotenv");
const User = require("../model/userModel");
dotenv.config();
const bcrypt = require("bcrypt")

// User :
const createUser = async (req, res) => {

    try {
        const { files } = req;
        const newobject = files.map((file) => file.filename);

        const { password } = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                const userdata = new User({
                    profile_photo: newobject,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hash,
                    createdEvent: req.body.createdEvent,
                    personalDetail: req.body.personalDetail,
                })
                const savedDetail = await userdata.save();
                res.status(200).json({ savedDetail })
            })
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get Userdata api:
const UserData = async (req, res) => {
    // req.user = { user_id: req.user.userId };
    // console.log(req.user);
    try {
        // let getdata = req.user
        // console.log(getdata);
        // console.log(req.user.userId, "getdata");
        const data = await User.findOne({ _id: req.user.user_id }).populate("createdEvent").populate("personalDetail");
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get user api using filter :
const UserSpecificData = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.user.user_id }, { first_name: 1, last_name: 1 }).populate("createdEvent", { title: 1 });
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
//update User api :
const UpdateUser = async (req, res) => {
    try {
        const updatedData = req.user
        // console.log(updatedData);
        const data = await User.findOne({ _id: updatedData.user.user_id })

        data.set(req.body);
        const updatedUser = await data.save();
        res.json({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// Delete User single Data by id api :
const deleteUserData = async (req, res) => {
    try {
        const data = await User.findOneAndDelete({ _id: req.user.user_id });
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
    UserData,
    UpdateUser,
    UserSpecificData,
    UserFilterData,
    deleteUserData,
    UserMatch,
    UserLookup
}
