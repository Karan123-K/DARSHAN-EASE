const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    temple: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    capacity: {
        type: Number,
    },
    available: {
        type: Number,
    }

})

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;