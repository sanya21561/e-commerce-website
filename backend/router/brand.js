const express = require('express')
const router = express.Router();

const {getAllBrand} =require('../controller/brand')

router.get('/',getAllBrand)

module.exports = router