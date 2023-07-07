const express = require('express')
const router = express.Router();

const {addToCart,emptyCart,getCart} =require('../controller/cart')

router.post('/',addToCart)
router.post('/delete',emptyCart)
router.post('/get',getCart)

module.exports = router