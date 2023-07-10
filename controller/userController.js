const User = require("../model_Schema/userModel");
const jwt = require("jsonwebtoken");
const secretKey = 'yourSecretKey';

// User :
const createUser = async (req, res) => {
    try {
        const userdata = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            createdEvent: req.body.createdEvent,
            personalDetail: req.body.personalDetail

        })
        const savedDetail = await userdata.save();
        // const data = await User.findByIdAndUpdate(req.body.createdEvent, { createdEvent: savedDetail.id }, { personalDetail: savedDetail.id });
        const token = jwt.sign({ savedDetail }, secretKey, { expiresIn: '20000s' });
        res.json({ token })

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(200).json({ savedDetail, token, expired: true });
                } else {
                    res.status(200).json({ savedDetail, token, expired: false });
                }
            } else {
                res.status(200).json({ savedDetail, token, expired: false });
            }

        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// // get Userdata api:
const UserData = async (req, res) => {
    try {
        const userId = req.params.id;

        const token = jwt.sign({ userId }, secretKey, { expiresIn: "3000s" });
        const data = await User.findById(req.params.id).populate("createdEvent").populate("personalDetail");
        // res.send(data, token)

        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ...... verify token
// const verifyToken = (req, res, next) => {
//     const bearHeader = req.headers["Authorization"]
//     if (typeof bearHeader !== "undefined") {
//         const bearerToken = bearHeader.split(' ')[1]
//         req.token = bearerToken;
//         next()
//     } else {
//         res.sendStatus(401);// forbidden
//     }
// }


// const verifyToken = (req, res) => {
//     jwt.verify(req.token, "secretKey", (err, authData) => {
//         if (err) {
//             res.sendStatus(401); // forbidden
//         } else {
//             res.json({
//                 message: "post created...",
//                 authData
//             });
//         }
//     });
// }
const verifyToken = (req, res) => {
    try {
        const token = req.header("authorization");
        console.log(token);

        const verified = jwt.verify(token, secretKey);
        console.log(verified);

        if (verified) {
            return res.send({ message: "Successfully Verified" });
        } else {
            return res.status(401).send({ message: "no token provided" });
        }
    } catch (error) {
        return res.status(401).send(error);
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
        const data = jwt.verify(token, secretKey);
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
        personalData.aggregate([
            { $match: { gender: "female" } },
            { $group: { _id: "age", totalUsersAges: { $sum: 1 } } },
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
        personalData.aggregate([
            { $lookup: { from: "Event", localField: "city", foreignField: "city", as: "gender" } },
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
    verifyToken,
    decodeToken,
    UserpersonalData,
    UpdateUser,
    UserSpecificData,
    UserFilterData,
    deleteUserData,
    UserMatch,
    UserLookup
}
