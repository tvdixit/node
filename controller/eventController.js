const path = require("path");
const Event = require("../model_Schema/EventModel");
const Event_post = require("../model_Schema/event_PostModel")
const Like_post = require("../model_Schema/likeModel")
const User = require("../model_Schema/userModel")
const jwt = require("jsonwebtoken");
const { file } = require("loader");
const { log } = require("console");
const secretKey = 'yourSecretKey';

// Event :
const createEvent = async (req, res) => {
    try {
        const eventdata = new Event({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            date: req.body.date,
            creator: req.body.creator,
            like_id: req.body.like_id
        })
        const savedDetail = await eventdata.save();
        // const data = await Event.findByIdAndUpdate(req.body.creator, { creator: savedDetail.id });
        const token = jwt.sign({ savedDetail }, secretKey, { expiresIn: '2000s' });
        console.log({ savedDetail, token });
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get eventdata api :
const EventData = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '2000s' });
        const data = await Event.findById(req.params.id).populate("creator");
        res.json({ success: true, message: "retrive data successfully", data, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Update Event api :
const UpdateEvent = async (req, res) => {
    try {
        const updatedData = req.body
        await Event.findOneAndUpdate({ _id: req.body._id },
            updatedData).then(async (data) => {
                var item = await Event.findById(data._id);
                res.send(item)
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// verify token :
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

// delete event :
const deleteEventData = async (req, res) => {
    try {
        const data = await Event.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "delete data successfully", data })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// event_post Model :---
// create event_post
const createpost = async (req, res) => {
    try {
        let newobject = []
        for (let i = 0; i < req.files.length; i++) {
            newobject.push(req.files[i].filename)
        }
        const eventdata = new Event_post({
            image: newobject,
            created_date: req.body.created_date,
            event_id: req.body.event_id
        });
        console.log(newobject);

        const savedDetail = await eventdata.save();
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get event_post data 
const EventpostData = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Event_post.findById(req.params.id).populate("event_id").populate({
            path: 'event_id',
            populate: {
                path: 'creator'
            }
        })
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Like_post Model :--
// post like data :
const like = async (req, res) => {
    try {
        const eventdata = new Like_post({
            user_id: req.body.user_id,
            like: req.body.like,
            event_post_id: req.body.event_post_id
        });
        const savedDetail = await eventdata.save();
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get like_post data :
const Likedpost = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Like_post.findByIdAndUpdate(req.params.id).populate("user_id").populate("event_post_id").populate({
            path: 'event_post_id',
            populate: {
                path: 'event_id'
            }
        })
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// decode token :
const decodetoken = async (req, res, next) => {
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
        // console.log(data, "data");

        const user = await User.findOne({ _id: data.userId })
        // console.log(user, "user");

        return res.status(200).send({ user });

    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
// like a post using user token :
const likebyuser = async (req, res) => {
    try {
        console.log(req.user, "req.user");
        const post = await User.findOne(req.params.id)
        console.log(req.params.id);
        // console.log(post, "post")

        // console.log(req.userId, "req.userId")
        // const decodedUserId = req.user.userId;
        // post.like = decodedUserId;

        // console.log(post.like);
        await post.save();
        // res.status(200).json(post.like);

    } catch (error) {
        res.status(500).send("server error")
    }
}
module.exports = {
    createEvent,
    EventData,
    UpdateEvent,
    verifyToken,
    decodetoken,
    deleteEventData,
    // event_post Model :--
    createpost,
    EventpostData,
    // like_post Model :--
    like,
    Likedpost,
    likebyuser
}