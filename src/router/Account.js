const { AccountController } = require('../controllers');
const express = require('express');
const router = express.Router();



router.post('/register', AccountController.ValidateCreate, AccountController.Create);

// router.put('/update/:email', AccountController.Update);

// router.delete('/delete/:email', AccountController.Delete);

router.post('/login', AccountController.ReadOne);

// router.get('/readMany', AccountController.ReadMany);

module.exports = router;
