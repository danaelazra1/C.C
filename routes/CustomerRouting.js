const express = require('express');
var router = express.Router();
const customerController = require('../controllers/CustomerController');
const productController = require('../controllers/ProductController');

router.route('/')
.get(customerController.getIndex)

router.route('/GetProducts')
.post(productController.getAllProducts);

router.route('/addProduct')
.post(customerController.addProductToCart)

router.route('/removeProduct')
.post(customerController.removeProductFromCart);

router.route('/login')
.get(customerController.GetLogin)
.post(customerController.UserAdminLogin)

router.route('/register')
.get(customerController.GetRegister)
.post(customerController.createUserAdmin)

router.route('/logout')
.get(customerController.UserLogout)

router.route('/cart')
.get(customerController.getCart)
.post(customerController.getCartProducts)

router.route('/maps')
.get(customerController.getMaps);

router.route('/isLogged')
.post(customerController.getCustomer);

router.route('/purchaseCart')
.post(customerController.purchaseCart);

router.route('/clearCart')
.post(customerController.clearAllCartItems)

module.exports = router;