const { CustomerController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/create', CustomerController.Create);

// router.get('/readMany', CustomerController.ReadMany);

// router.get('/readOne/:categoryId', CustomerController.ReadOne);

// router.put('/update/:categoryId', CustomerController.Update);

// router.delete('/delete/:categoryId', CustomerController.Delete);

module.exports = router;
