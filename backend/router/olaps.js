const express = require('express')
const router = express.Router();

const {getAllOlaps} =require('../controller/olaps')

router.get('/',getAllOlaps)

module.exports = router