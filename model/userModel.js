const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 4,
    },
    last_name: {
        type: String,
        required: true,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    personalDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'personal'
    },
    token: {
        type: String,
    },
    profile_photo: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema)
