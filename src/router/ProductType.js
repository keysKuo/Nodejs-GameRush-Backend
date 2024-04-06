const { ProductTypeController } = require('../controllers');
const { upload } = require('../middlewares/multer');

const express = require('express');
const router = express.Router();

router.post('/create', upload.single('file'), ProductTypeController.Create);

router.put('/update/:typeId', upload.single('file'), ProductTypeController.Update);

router.delete('/delete/:typeId', ProductTypeController.Delete);

router.get('/readOne/:typeId', ProductTypeController.ReadOne);

router.get('/readMany', ProductTypeController.ReadMany);

module.exports = router;
