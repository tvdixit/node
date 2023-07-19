const mongoose = require('mongoose');

const Like_post = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: Number,
        default: 1,
        // required: true
    },
    event_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventPost'
    }
});

module.exports = mongoose.model('likePost', Like_post)