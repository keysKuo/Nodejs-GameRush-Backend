const { TransactionController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/checkout', TransactionController.CreatePaymentSession);

router.post('/complete_checkout', TransactionController.Create);

router.put('/update/:transactionId', TransactionController.Update);

router.delete('/delete/:transactionId', TransactionController.Delete);

router.get('/readOne/:transactionId', TransactionController.ReadOne);

router.get('/readMany', TransactionController.ReadMany);

module.exports = router;
