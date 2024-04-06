const CategoryRouter = require('./Category');
const ProductTypeRouter = require('./ProductType');
const ProductRouter = require('./Product');
const TransactionRouter = require('./Transaction');
const CustomerRouter = require('./Customer');
const AccountRouter = require('./Account');

const express = require('express');
const router = express.Router();

// localhost:8000/api/category/create
router.use('/category', CategoryRouter);

router.use('/productType', ProductTypeRouter);

router.use('/product', ProductRouter);

router.use('/transaction', TransactionRouter);

router.use('/customer', CustomerRouter);

router.use('/account', AccountRouter);

module.exports = router;
