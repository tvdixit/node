const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
module.exports = mongoose.model('personal', personalSchema)


