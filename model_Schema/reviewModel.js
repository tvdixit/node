const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    star_rating: [{
        type: Number,
        postedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        default: 0,
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('Rating', RatingSchema)
