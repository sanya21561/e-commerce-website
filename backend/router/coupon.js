const express = require('express')
const router = express.Router();

const {getAllCoupon,removeCoupon} =require('../controller/coupon')

router.post('/',getAllCoupon)
router.post('/removecoupon',removeCoupon)

module.exports = router