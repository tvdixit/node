const personalData = require("../model/personalModel");
const dotenv = require("dotenv");
dotenv.config();

// create personaDetail : 
const createDetail = async (req, res) => {
    try {
        const data = new personalData({
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            city: req.body.city
        });
        const savedDetail = await data.save();
        res.status(200).json({ savedDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get personalDetail data :
const UserpersonalData = async (req, res) => {
    try {
        const data = await personalData.findOne({ user_id: req.user.user_id }).populate("user_id")
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// update personal data :
const UpdatePersonaldata = async (req, res) => {
    try {
        const updatedData = req.user
        const data = await personalData.findOne({ user_id: updatedData.user_id })
        data.set(req.body);
        const updatedUser = await data.save()
        res.json({
            _id: updatedUser._id,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            age: updatedUser.age,
            city: updatedUser.city
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// delete personalDetail 
const deletepersonalData = async (req, res) => {
    try {
        const data = await personalData.findOneAndDelete({ user_id: req.user.user_id });
        res.json({ success: true, message: "delete data successfully", data })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// personalDetail Lookup :
const PersonalLookup = async (req, res) => {
    try {
        personalData.aggregate([
            { $lookup: { from: "bookings", localField: "city", foreignField: "_id", as: "booking" } },
        ]).then((data) => {
            res.json(data)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    createDetail,
    UserpersonalData,
    UpdatePersonaldata,
    deletepersonalData,
    PersonalLookup
}