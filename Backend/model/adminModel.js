const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    admin_type: {
        type: String,
        required: true,
        enum: [0, 1, 2, 3],
        default: 1
    },
}, {
    timestamps: true
});

const adminModel = mongoose.model('Admin', adminSchema)

module.exports = adminModel;