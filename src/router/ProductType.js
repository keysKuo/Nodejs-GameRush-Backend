const { ProductTypeController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/create', ProductTypeController.Create);

router.put('/update/:typeId', ProductTypeController.Update);

router.delete('/delete/:typeId', ProductTypeController.Delete);

router.get('/readOne/:typeId', ProductTypeController.ReadOne);

router.get('/readMany', ProductTypeController.ReadMany);

module.exports = router;
