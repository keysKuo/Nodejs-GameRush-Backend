const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema(
    {
        transactionId: { type: String, required: true, default: 'TS' + Math.floor(Math.random() * 999999) },
        productsId: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        customerId: { type: mongoose.Types.ObjectId, ref: 'Customer' },
        total: { type: Number, required: true, default: 0 },
        paymentType: { type: String, required: true, enum: ['paypal', 'stripe'] },
        status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Transaction', Transaction);
