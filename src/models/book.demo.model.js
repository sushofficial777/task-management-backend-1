const mongoose = require('mongoose');
const { DEMO_STATUS } = require('../config/appConstants');
const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(DEMO_STATUS),
        default: DEMO_STATUS.PENDING
    },
    demoDate: {
        type: Date,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
