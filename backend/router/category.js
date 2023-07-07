const express = require('express')
const router = express.Router();

const {getAllCategory} =require('../controller/category')

router.get('/',getAllCategory)

module.exports = router