const personalData = require("../model_Schema/personalModel");
const jwt = require("jsonwebtoken")
const secretKey = 'yourSecretKey';

const createDetail = async (req, res) => {
    try {
        const data = new personalData({
            phone: req.body.phone,
            gender: req.body.gender,
            age: req.body.age,
            city: req.body.city
        });
        const savedDetail = await data.save();
        const token = jwt.sign({ savedDetail }, secretKey, { expiresIn: '2000s' });
        res.status(200).json({ savedDetail, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const UserpersonalData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '2000s' });
        const data = await personalData.findById(req.params.id);
        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const verifyToken = (req, res) => {
    try {
        const token = req.header("authorization");
        console.log(token)
        const verified = jwt.verify(token, secretKey);
        console.log(verified);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
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
        const data = jwt.verify(token, secretKey);
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
module.exports = {
    createDetail,
    UserpersonalData,
    verifyToken,
    decodetoken,
    deletepersonalData
}