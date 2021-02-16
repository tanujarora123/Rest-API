const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phn: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const MemModel = mongoose.model('member', schema);

module.exports = MemModel;