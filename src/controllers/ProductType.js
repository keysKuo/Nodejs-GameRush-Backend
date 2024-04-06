const { ProductType } = require('../models/');

// CRUD

async function Create(req, res, next) {
    const { typeName, description, status, originalPrice, sellPrice } = req.body;

    return await ProductType.create({ ...req.body, typeId: 'PR' + Math.floor(Math.random() * 999999) })
        .then((type) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create product type successfully',
                type,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create product type fail: ' + err,
            });
        });
}

async function Update(req, res, next) {
    const { typeId } = req.params;

    return await ProductType.findOneAndUpdate({ typeId }, { ...req.body }, { returnOriginal: false })
        .then((type) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Update Product type successfully',
                type,
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
    const { typeId } = req.params;

    return await ProductType.findOneAndDelete({ typeId })
        .then((type) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Delete Product type successfully',
                type,
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
    const { typeId } = req.params;

    return await ProductType.findOne({ typeId })
        .then((type) => {
            return res.json({
                success: true,
                status: 200,
                msg: `Read Successfully`,
                type,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read Product type fail: ' + err,
            });
        });
}
async function ReadMany(req, res, next) {
    return await ProductType.find({ ...req.query })
        .then((types) => {
            return res.json({
                success: true,
                status: 200,
                msg: `... ${types.length} products type`,
                types,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read products type fail: ' + err,
            });
        });
}

module.exports = { Create, ReadMany, ReadOne, Update, Delete };
