const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userDelete } = require('../controllers/userController.js');
const cartController = require('../controllers/cartController.js');
const authenticate = require('../middleware/auth.js');

router.post('/login', userLogin, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/register',
  userRegister,
  cartController.createCart,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

router.delete('/delete', authenticate, userDelete, (req, res) => {
})

module.exports = router;
