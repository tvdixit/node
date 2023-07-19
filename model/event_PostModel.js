const mongoose = require('mongoose');

const Event_post = new mongoose.Schema({
    image: {
        type: Array,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
});

module.exports = mongoose.model('eventPost', Event_post)
