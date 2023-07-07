const express = require('express')
const router = express.Router();

const {getAllProducts,deleteProduct,addProduct} =require('../controller/products')

router.get('/',getAllProducts)
router.delete('/:id',deleteProduct)
router.post('/addproduct',addProduct)

module.exports = router