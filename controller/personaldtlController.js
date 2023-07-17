const personalData = require("../model_Schema/personalModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createDetail = async (req, res) => {
    try {
        const data = new personalData({
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            city: req.body.city
        });
        const savedDetail = await data.save();
        const token = jwt.sign({ savedDetail }, process.env.SECRET_KEY, { expiresIn: '2000s' });
        res.status(200).json({ savedDetail, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const UserpersonalData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '2000s' });
        const data = await personalData.findById(req.params.id);
        res.json({ success: true, message: "retrive data successfully", data, token })
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
        const user = await personalData.findOne({ _id: data.userId })
        res.status(200).send({ data, user });
    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

const deletepersonalData = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "delete data successfully", data })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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
    decodetoken,
    deletepersonalData,
    PersonalLookup
}