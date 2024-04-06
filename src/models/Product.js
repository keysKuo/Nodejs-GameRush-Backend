const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        productId: { type: String, required: true, default: 'AX' + Math.floor(Math.random() * 999999) },
        encryptedData: { type: String, required: true },
        expiry: { type: Date, required: true, default: new Date() },
        typeId: { type: mongoose.Types.ObjectId, ref: 'ProductType' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);