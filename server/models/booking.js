const mongoose = require('mongoose');
const Temple = require('./temples');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    temple:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: true
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    status:{
        type : String,
        default: 'CONFIRMED'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;