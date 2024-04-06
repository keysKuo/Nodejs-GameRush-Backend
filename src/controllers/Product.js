const { Product } = require('../models/');
const { encryptAES, decryptAES } = require('../utils/crypto');
require('dotenv').config();
const secretKey = process.env.ACCESS_TOKEN_SECRET || 'afhhica';
// CRUD

async function Create(req, res, next) {
    const { encryptedData } = req.body;
    return await Product.create({
        ...req.body,
        encryptedData: encryptAES(encryptedData, secretKey),
        productId: 'P' + Math.floor(Math.random() * 999999),
    })
        .then((product) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create Product Successfully',
                product,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create Product Fail: ' + err,
            });
        });
}

async function Update(req, res, next) {
    const { productId } = req.params;
    const { expiry } = req.body;

    return await Product.findOneAndUpdate({ productId }, { expiry }, { returnOriginal: false })
        .then((product) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Update Successfully',
                product,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Update Fail: ' + err,
            });
        });
}
async function Delete(req, res, next) {
    const { productId } = req.params;

    return await Product.findOneAndDelete({ productId })
        .then((product) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Delete Successfully',
                product,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Delete Fail: ' + err,
            });
        });
}

async function ReadOne(req, res, next) {
    const { productId } = req.params;

    return await Product.findOne({ productId }).lean()
        .then((product) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Read One Successfully',
                product: {
                    ...product,
                    decryptedData: decryptAES(product.encryptedData, secretKey)
                },
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read Fail: ' + err,
            });
        });
}

async function ReadMany(req, res, next) {
    return await Product.find({ ...req.query })
        .then((products) => {
            return res.json({
                success: true,
                status: 200,
                msg: `${products.length} products`,
                products,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read Fail: ' + err,
            });
        });
}

module.exports = { Create, Update, Delete, ReadMany, ReadOne };
