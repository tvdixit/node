const mongoose = require('mongoose');

const Like_post = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        required: "User"
    },
    event_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventPost'
    }
});

module.exports = mongoose.model('likePost', Like_post)
