const express = require("express");
const router = express.Router();
const {getProducts, getOneProduct} = require('../controllers/productController');


router.get('/products', getProducts,(req,res)=>{
    res.status(200).json(res.locals.allProducts)
})

router.get('/products/:id', getOneProduct, (req,res) => {
    res.status(200).json(res.locals.oneProduct)
})

module.exports = router;