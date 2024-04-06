const { Transaction, Product } = require('../models/');
const { createPaypalSession, createStripeSession, exchangeRate } = require('../utils/payments');
// CRUD

async function Create(req, res, next) {
    return await Transaction.create({
        ...req.body,
        transactionId: 'TS' + +Math.floor(Math.random() * 999999),
        status: 'completed',
    })
        .then((transaction) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Create Transaction Successfully',
                transaction,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Create Fail: ' + err,
            });
        });
}

async function Update(req, res, next) {
    const { transactionId } = req.params;
    const { paymentType, status } = req.body;

    return await Transaction.findOneAndUpdate({ transactionId }, { paymentType, status }, { returnOriginal: false })
        .then((transaction) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Update Transaction Successfully',
                transaction,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Update Transaction Fail: ' + err,
            });
        });
}
async function Delete(req, res, next) {
    const { transactionId } = req.params;

    return await Transaction.findOneAndDelete({ transactionId })
        .then((transaction) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Delete Transaction Successfully',
                transaction,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Delete Transaction Fail: ' + err,
            });
        });
}

async function ReadOne(req, res, next) {
    const { transactionId } = req.params;

    return await Transaction.findOne({ transactionId })
        .then((transaction) => {
            return res.json({
                success: true,
                status: 200,
                msg: 'Read One Transaction Successfully',
                transaction,
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                msg: 'Read One Transaction Fail: ' + err,
            });
        });
}

async function ReadMany(req, res, next) {
    return await Transaction.find({ ...req.query })
        .then((transactions) => {
            return res.json({
                success: true,
                status: 200,
                msg: `${transactions.length} Transactions`,
                transactions,
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

async function CreatePaymentSession(req, res, next) {
    const { paymentType, products, total } = req.body;
    const rate = await exchangeRate('vnd', 'usd');

    const listOfProducts = await Product.find({ _id: { $in: products } })
        .populate({ path: 'productType'})
        .lean();

    if(listOfProducts.length == 0) {
        return res.json({
            success: false,
            status: 404,
            msg: 'Products not found',
        });
    }
    
    const options = {
        items: listOfProducts.map((product) => {
            return {
                name: product.productType?.typeName,
                price: product.productType?.sellPrice * rate,
                quantity: 1,
                image: product.productType?.image,
            };
        }),
        total: total * rate,
        success_url: 'http://localhost:3000/checkout/success',
        cancel_url: 'http://localhost:3000/cart',
    };

    let session_url = '';

    switch (paymentType) {
        case 'stripe':
            session_url = await createStripeSession(options);
            break;
        case 'paypal':
            session_url = await createPaypalSession(options);
            break;
        default:
            return res.json({
                success: false,
                status: 300,
                msg: 'Payment type invalid',
            });
    }

    if (!session_url) {
        return res.json({
            success: false,
            status: 500,
            msg: 'Create payment session fail',
        });
    }

    return res.json({
        success: true,
        status: 200,
        session_url,
        msg: 'Create payment session successfully',
    });
}

module.exports = { Create, Update, Delete, ReadMany, ReadOne, CreatePaymentSession };
