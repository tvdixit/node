const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    personalDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'personal'
    },
});

module.exports = mongoose.model('User', UserSchema)
