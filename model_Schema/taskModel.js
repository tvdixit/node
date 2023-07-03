const mongoose = require('mongoose');

const taskManagement = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    },
});
module.exports = mongoose.model('task', taskManagement)
