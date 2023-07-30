const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// User :
// const createUser = async (req, res) => {
//     try {
//         if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
//             return res.status(400).json({ message: "Please provide first_name, last_name, email and  password" });
//         }

//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(req.body.email)) {
//             return res.status(400).json({ message: "Please provide a valid email address." });
//         }

//         let newobject = []
//         for (let i = 0; i < req.files.length; i++) {
//             newobject.push(req.files[i].filename)
//         }
//         const { email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: "Email is already taken." });
//         }
//         const saltRounds = 10;
//         bcrypt.hash(password, saltRounds, async function (err, hash) {
//             if (err) {
//                 return res.status(500).json({ message: "An error occurred while hashing the password." });
//             }
//             const userdata = new User({
//                 profile_photo: newobject,
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 email: req.body.email,
//                 password: hash,
//                 createdEvent: req.body.createdEvent,
//                 personalDetail: req.body.personalDetail,
//             })
//             const savedDetail = await userdata.save();
//             res.status(200).json({ savedDetail });
//         });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }



const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // if (!req.files || !req.files[0] || !req.files[0].filename || !first_name || !last_name || !email || !password) {
        //     return res.status(400).json({ message: "Please provide profile_photo, first_name, last_name, email, and password." });
        // }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already taken." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userdata = new User({
            profile_photo: req.files[0].filename,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            createdEvent: req.body.createdEvent,
            personalDetail: req.body.personalDetail,
        });
        // console.log(newobject, "obj");
        const savedDetail = await userdata.save();
        res.status(200).json({ savedDetail });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while processing the request." });
    }
}


// get Userdata api:
const UserData = async (req, res) => {
    try {
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
