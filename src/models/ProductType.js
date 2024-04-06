const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema(
    {
        typeId: { type: String, required: true},
        typeName: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true, enum: ['available', 'unavailable'], default: 'available' },
        originalPrice: { type: Number, required: true, default: 0 },
        sellPrice: { type: Number, required: true, default: 0 },
        image: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: 'Category' },
        isHot: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ProductType', ProductType);
