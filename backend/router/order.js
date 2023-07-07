const express = require('express')
const router = express.Router();

const {getOrders,getOrdersAgent,changeOrderStatus,getOrdersCustomer} =require('../controller/order')

router.get('/',getOrders)
router.get('/agent/:id',getOrdersAgent)
router.put('/:id',changeOrderStatus)
router.get('/customer/:id',getOrdersCustomer)

module.exports = router