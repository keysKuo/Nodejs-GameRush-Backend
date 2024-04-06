const { Customer } = require('../models/');

// CRUD

async function Create(req, res, next) {
    return await Customer.create({ ...req.body })
        .then((customer) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create Customer Successfully',
                customer,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create Customer Fail: ' + err,
            });
        });
}

async function Update(req, res, next) {}
async function Delete(req, res, next) {}

async function ReadOne(req, res, next) {}
async function ReadMany(req, res, next) {}

module.exports = { Create, ReadMany, ReadOne, Update, Delete };
