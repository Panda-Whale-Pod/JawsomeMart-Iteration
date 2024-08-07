const express = require("express");
const router = express.Router();
const {getProducts} = require('../controllers/productController');

router.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id.toString() === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

router.get('/products', getProducts,(req,res)=>{

res.json(res.locals.allProducts)

})


module.exports = router;