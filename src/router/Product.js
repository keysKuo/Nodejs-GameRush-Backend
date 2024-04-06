const { ProductController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/create', ProductController.Create);

router.put('/update/:productId', ProductController.Update);

router.delete('/delete/:productId', ProductController.Delete);

router.get('/readOne/:productId', ProductController.ReadOne);

router.get('/readMany', ProductController.ReadMany);

module.exports = router;
