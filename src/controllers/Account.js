const { Account } = require('../models/');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// CRUD

async function Create(req, res, next) {
    return await Account.create({ ...req.body, password: bcrypt.hashSync(req.body.password, salt) })
        .then((account) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create Account Successfully',
                account,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create Account Fail: ' + err,
            });
        });
}

async function Update(req, res, next) {}
async function Delete(req, res, next) {}

async function ReadOne(req, res, next) {
    const { email, password } = req.body;

    return await Account.findOne({ email })
        .then((account) => {
            if(!bcrypt.compareSync(password, account.password)) {
                return res.json({
                    success: false,
                    status: 300,
                    msg: 'Authentication invalid',
                });
            }

            return res.json({
                suuccess: true,
                status: 200,
                msg: 'Login Successfully',
                account,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Find One Fail: ' + err,
            });
        });
}

async function ReadMany(req, res, next) {}


async function ValidateCreate(req, res, next) {
    const { email, password, fullname, phone, role } = req.body;

    if(!email.includes('@')) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Email invalid'
        })
    }

    if(password.length < 8) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Password at least 8 characters'
        })
    }

    if(phone.length != 10) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Phone number invalid'
        })
    }

    const account = await Account.findOne({email});

    if(account) {
        return res.json({
            success: false,
            status: 300,
            msg: 'Account existed'
        })
    }

    next();
}

module.exports = { Create, ReadMany, ReadOne, Update, Delete, ValidateCreate };
