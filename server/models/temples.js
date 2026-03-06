const mongoose = require('mongoose');
const User = require('./users');

const templeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Temple = mongoose.model('Temple',templeSchema);

module.exports = Temple;