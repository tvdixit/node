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
        const data = await personalData.findById(req.params.id);
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// update personal data :
const UpdatePersonaldata = async (req, res) => {
    try {
        const updatedData = req.body
        await personalData.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await personalData.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// delete personalDetail 
const deletepersonalData = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
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