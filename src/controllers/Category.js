const { Category } = require('../models/');

// CRUD

async function Create(req, res, next) {
    const { categoryName } = req.body;

    return await Category.create({ categoryName, categoryId: 'CA' + Math.floor(Math.random() * 999999) })
        .then((category) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create category successfully',
                category,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create category fail: ' + err,
            });
        });
}

async function Update(req, res, next) {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    return await Category.findOneAndUpdate({ categoryId }, { categoryName }, { returnOriginal: false })
        .then((category) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Updated Successfully',
                category,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Updated Fail: ' + err,
            });
        });
}
async function Delete(req, res, next) {
    const { categoryId } = req.params;

    return await Category.findOneAndDelete({ categoryId })
        .then((category) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Deleted Successfully',
                category,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Deleted Fail' + err,
            });
        });
}

async function ReadOne(req, res, next) {
    const { categoryId } = req.params;

    return await Category.findOne({ categoryId })
        .then((category) => {
            return res.json({
                success: true,
                status: 200,
                msg: `... Successfully`,
                category,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read categories fail: ' + err,
            });
        });
}
async function ReadMany(req, res, next) {
    return await Category.find({ ...req.query })
        .then((categories) => {
            return res.json({
                success: true,
                status: 200,
                msg: `... ${categories.length} categories`,
                categories,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read categories fail: ' + err,
            });
        });
}

module.exports = { Create, ReadMany, ReadOne, Update, Delete };
