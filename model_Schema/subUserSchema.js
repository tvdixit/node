const mongoose = require('mongoose');

const UserstatusSchema = new mongoose.Schema({
    name: {
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
    }
});
module.exports = mongoose.model('task', UserstatusSchema)
