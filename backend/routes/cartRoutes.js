const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');
const authenticate = require('../middleware/auth.js');

router.post('/', authenticate, cartController.createCart, (req, res) => {});

router.post('/add', authenticate, cartController.addCart, (req, res) => {});

router.post('/order', authenticate, cartController.orderCart, (req, res) => {});
router.post(
  '/delete',
  authenticate,
  cartController.removeItem,
  (req, res) => {}
);

router.get('/', authenticate, cartController.getCart, (req, res) => {});

router.delete('/delete', authenticate, cartController.deleteCart, (req, res) => {});

module.exports = router;
