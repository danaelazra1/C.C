const express = require('express');
var router = express.Router();
const customerController = require('../controllers/CustomerController')

router.route('/')
.get(customerController.getIndex)

router.route('/newProduct')
.post(customerController.addProductToCart)



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
.post(customerController.getCart)



module.exports = router;