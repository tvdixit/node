const Event = require("../model/EventModel");
const Event_post = require("../model/event_PostModel")
const Like_post = require("../model/likeModel")
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
        })
        const savedDetail = await eventdata.save();
        res.status(200).json(savedDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get eventdata api :
const EventData = async (req, res) => {
    try {
        const data = await Event.findOne({ creator: req.user.user_id }).populate("creator");
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Update Event api :
const UpdateEvent = async (req, res) => {
    try {
        const updatedData = req.body
        await Event.findOne({ creator: req.user.user_id },
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
        const data = await Event.findOneAndDelete({ creator: req.user.user_id });
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
        const { event_id } = req.body;
        const existingUser = await Event_post.findOne({ event_id });
        if (existingUser) {
            return res.status(409).json({ message: "event_id is already taken." });
        }

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
        const data = await Event_post.findById(req.query.id).populate("event_id").populate({
            path: 'event_id',
            populate: {
                path: 'creator'
            }
        })
        res.json({ success: true, message: "retrive data successfully", data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// ..Like_post Model :--
//.. post like data :

// get like_post data :
const Likedpost = async (req, res) => {
    try {
        const data = await Like_post.findByIdAndUpdate(req.query.id).populate("user_id").populate("event_post_id").populate({
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
// like a post using user token :
const likebyuser = async (req, res) => {
    Like_post.aggregate([{
        $match: {
            $and: [
                { user_id: new ObjectId(req.user.user_id) },
                { event_post_id: new ObjectId(req.query.id) },
            ]
        }
    }]).then((item) => {
        if (item.length === 0) {
            const eventdata = new Like_post({
                user_id: req.user.user_id,
                event_post_id: req.query.id
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
                    { event_post_id: new ObjectId(req.query.id) },
                ]
            }).then((result) => {
                res.status(200).json({ message: "Post Unlike" });
            }).catch((e) => {
                res.status(500).send("Failed to delete ");
            });
        }
    }).catch((e) => {
        res.status(500).send("Error in like data.");
    });
}

// find user like how many posts
const UserLikedpost = async (req, res) => {
    try {
        const likes = await Like_post.find({ user_id: req.query.id });

        if (!likes) {
            res.send("No likes found for this post.");
        } else {
            res.json({ success: true, data: [likes] });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// find post have how many users like :
const PostLikedbyUser = async (req, res) => {
    try {
        const event_post_id = req.query.id;
        // console.log(event_post_id, "event_post_id");
        const likes = await Like_post.find({ event_post_id: event_post_id });
        // console.log(likes, "like");

        if (likes) {
            res.json({ success: true, data: [likes] });
        } else {
            res.send("No likes found for this post.");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get all like posts data :
const AllLikedpost = async (req, res) => {
    try {
        const data = await Like_post.find()
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// get event_post data 
const AllEventData = async (req, res) => {
    try {
        const data = await Event_post.find()
        // .populate("event_id")
        res.json({ success: true, message: "retrive data successfully", data })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// push liker data in post :
const LikeDatainPost = async (req, res) => {
    try {
        const likeData = []
        const data = await Event_post.find({ event_id: req.query.id })

        for (const item of data) {
            // console.log({ ...item }, "item");
            // console.log(data, "data");
            const datalike = await Like_post.find({ event_post_id: item.id });
            // console.log(datalike, "datalike");
            likeData.push({ ...item._doc, likes: datalike });
        }
        res.status(200).json({ likeData })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    createEvent,
    EventData,
    UpdateEvent,
    deleteEventData,
    // event_post Model :--
    createpost,
    EventpostData,
    AllLikedpost,
    // like_post Model :--
    Likedpost,
    likebyuser,
    UserLikedpost,
    PostLikedbyUser,
    AllEventData,
    LikeDatainPost


}