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

// router.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p.id.toString() === req.params.id);
//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({ message: 'Product not found' });
//     }
// });