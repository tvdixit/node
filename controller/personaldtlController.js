const personalData = require("../model_Schema/personalModel");
const jwt = require("jsonwebtoken")

const createDetail = async (req, res) => {
    try {
        const data = new personalData({
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            city: req.body.city
        });
        const token = jwt.sign({ data }, 'your_secret_key');
        const savedDetail = await data.save();
        res.status(200).json({ savedDetail, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const UserpersonalData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, 'your_secret_key');
        const data = await personalData.findById(req.params.id);
        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createDetail,
    UserpersonalData

}