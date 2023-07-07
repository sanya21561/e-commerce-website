const express = require('express')
const router = express.Router();

const {Checkout} =require('../controller/checkout')

router.post('/',Checkout)

module.exports = router