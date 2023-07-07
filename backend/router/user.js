const express = require('express')
const router = express.Router();

const {getAgents,getCustomers} =require('../controller/user')

router.get('/agents',getAgents)
router.get('/customers',getCustomers)

module.exports = router