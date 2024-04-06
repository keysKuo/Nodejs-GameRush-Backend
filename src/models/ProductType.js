const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema(
    {
        typeId: { type: String, required: true, default: 'PR' + Math.floor(Math.random() * 999999 )},
        typeName: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true, enum: ['available', 'unavailable'], default: 'available' },
        originalPrice: { type: Number, required: true, default: 0 },
        sellPrice: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        categoryId: { type: mongoose.Types.ObjectId, ref: 'Category' },
        isHot: { type: Boolean, required: true, default: false }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ProductType', ProductType);