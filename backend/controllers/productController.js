const Product = require('../models/productModel.js');

let productController = {};

productController.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.locals.allProducts = products
    next()
  } catch (err) {
    return next({
      message: 'error in getProducts: ' + err,
      log: err,
    });
  }
};

productController.getOneProduct = async (req,res,next) => {
  try {
    const id = req.params.id
    console.log(id);
    const product = await Product.findOne({_id:id})
    console.log(product);
    res.locals.oneProduct = product
    next();
  } catch (err) {
    return next ({
    message: 'error in getOneProduct: ' + err,
    log: err,
    });
  }
}

module.exports = productController;