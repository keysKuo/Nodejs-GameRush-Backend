const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        productId: { type: String, required: true },
        encryptedData: { type: String, required: true },
        expiry: { type: Date, required: true, default: new Date() },
        status: { type: String, required: true, enum: ['sold', 'expired', 'available'] },
        productType: { type: mongoose.Types.ObjectId, ref: 'ProductType' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
