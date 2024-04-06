const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema(
    {
        email: { type: String, required: true },
        fullname: { type: String, required: true },
        phone: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Customer', Customer);