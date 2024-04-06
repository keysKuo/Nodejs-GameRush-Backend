const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema(
    {
        categoryId: { type: String, required: true, default: 'CA' + Math.floor(Math.random() * 999999) },
        categoryName: { type: String, required: true }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Category', Category);