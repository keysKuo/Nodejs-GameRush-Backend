const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema(
    {
        transactionId: { type: String, required: true },
        products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
        total: { type: Number, required: true, default: 0 },
        paymentType: { type: String, required: true, enum: ['paypal', 'stripe'] },
        status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Transaction', Transaction);
