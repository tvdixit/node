const Review = require("../model/reviewModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Post Review :
const AddReview = async (req, res) => {
    try {
        const userdata = new Review({
            description: req.body.description,
            star_rating: req.body.star_rating,
            user_id: req.body.user_id,
            event_id: req.body.event_id
        })
        const savedDetail = await userdata.save();
        res.json({ savedDetail })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
// get  review by id :
const ReviewData = async (req, res) => {
    try {


        const data = await Review.findById(req.params.id).populate("user_id", { first_name: 1, last_name: 1, email: 1 }).populate("event_id", { title: 1, description: 1, price: 1 })
        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }
        const reviews = data.reviews;
        res.json({ success: true, message: "retrive data successfully", data, reviews })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    AddReview,
    ReviewData
}