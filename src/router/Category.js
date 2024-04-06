const { CategoryController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/create', CategoryController.Create);

router.get('/readMany', CategoryController.ReadMany);

router.get('/readOne/:categoryId', CategoryController.ReadOne);

router.put('/update/:categoryId', CategoryController.Update);

router.delete('/delete/:categoryId', CategoryController.Delete);

module.exports = router;
