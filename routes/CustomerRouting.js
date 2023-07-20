const express = require('express');
var router = express.Router();
const customerController = require('../controllers/CustomerController')

router.route('/')
.get(customerController.getIndex)

router.route('/addProduct')
.post(customerController.addProductToCart)

router.route('/removeProduct')
.post(customerController.removeProductFromCart); //TODO :: Add functionality to cart products

router.route('/login')
.get(customerController.GetLogin)
.post(customerController.UserAdminLogin)

router.route('/register')
.get(customerController.GetRegister)
.post(customerController.createUserAdmin)

router.route('/logout')
.get(customerController.UserLogout)


router.route('/allcookies')
.get(customerController.getAllCookies)

router.route('/amsterdam')
.get(customerController.getAmsterdam)

router.route('/m&m')
.get(customerController.getMAndM)

router.route('/chocolate')
.get(customerController.getChoclateChipsCookies)

router.route('/special')
.get(customerController.getSpecialCookies)

router.route('/cart')
.get(customerController.getCart)
.post(customerController.getCartProducts)

router.route('/maps')
.get(customerController.getMaps);

// router.route('/purchaseCart')
// .post(customerController.purchaseCart); //TODO :: Add functionality to purchase cart

module.exports = router;