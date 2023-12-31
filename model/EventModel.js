const { date } = require('joi/lib');
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('Event', EventSchema)
