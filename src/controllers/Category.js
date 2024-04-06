const { Category } = require('../models/');

// CRUD

async function Create(req, res, next) {
    const { categoryName } = req.body;

    return await Category.create({ categoryName })
        .then(category => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create category successfully',
                category
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create category fail: ' + err,
            })
        })
}

async function Update() {

}
async function Delete() {

}

async function ReadOne(req, res, next) {
    const { categoryId } = req.params;

    return await Category.findOne({ categoryId })
        .then(category => {
            return res.json({
                success: true,
                status: 200,
                msg: `... Successfully`,
                category
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read categories fail: ' + err,
            })
        })
}
async function ReadMany(req, res, next) {
    return await Category.find({ ...req.query })
        .then(categories => {
            return res.json({
                success: true,
                status: 200,
                msg: `... ${categories.length} categories`,
                categories
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read categories fail: ' + err,
            })
        })
}

module.exports = { Create, ReadMany, ReadOne }
