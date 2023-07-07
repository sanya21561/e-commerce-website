const express = require('express')
const router = express.Router();

const {login,getAddressLogin} =require('../controller/login')

router.post('/',login)
router.get('/:id',getAddressLogin)

module.exports = router