const express = require('express')
const router = express.Router();

const {signup} =require('../controller/signup')

router.post('/',signup)

module.exports = router