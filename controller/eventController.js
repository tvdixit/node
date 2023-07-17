const Event = require("../model_Schema/EventModel");
const Event_post = require("../model_Schema/event_PostModel")
const Like_post = require("../model_Schema/likeModel")
const User = require("../model_Schema/userModel")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var ObjectId = require('mongodb').ObjectId;

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
        const token = jwt.sign({ savedDetail }, process.env.SECRET_KEY, { expiresIn: '2000s' });
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
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '2000s' });
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
// ..Like_post Model :--
//.. post like data :
const like = async (req, res) => {
    //     try {
    //         const eventdata = new Like_post({
    //             user_id: req.body.user_id,
    //             like: req.body.like,
    //             event_post_id: req.body.event_post_id
    //         });
    //         const savedDetail = await eventdata.save();
    //         res.status(200).json(savedDetail);
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
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
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Like_post.findOne({ _id: data.userId })
        return res.status(200).send({ user });

    } catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
// like a post using user token :
const likebyuser = async (req, res) => {
    let post_id = req.params.id
    Like_post.aggregate([{
        $match: {
            $and: [
                { user_id: new ObjectId(req.user.user_id) },
                { event_post_id: new ObjectId(post_id) },
            ]
        }
    }]).then((item) => {
        if (item.length === 0) {
            const eventdata = new Like_post({
                user_id: req.user.user_id,
                event_post_id: post_id
            });
            eventdata.save().then((savedDetail) => {
                res.status(200).json(savedDetail);
            }).catch((e) => {
                res.status(500).send("data not saved");
            });
        } else {
            Like_post.deleteOne({
                $and: [
                    { user_id: new ObjectId(req.user.user_id) },
                    { event_post_id: new ObjectId(post_id) },
                ]
            }).then((result) => {
                res.status(200).json({ message: "record deleted " });
            }).catch((e) => {
                res.status(500).send("Failed to delete ");
            });
        }
    }).catch((e) => {
        console.log("e", e.message);
        res.status(500).send("Error in like data.");
    });
}
module.exports = {
    createEvent,
    EventData,
    UpdateEvent,
    // verifyToken,
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