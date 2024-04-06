const CategoryRouter = require('./Category');
const express = require('express');
const router = express.Router();

// localhost:8000/api/category/create
router.use('/category', CategoryRouter);

module.exports = router;