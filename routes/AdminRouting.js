const express = require('express');
const adminController = require('../controllers/AdminController')
var router = express.Router();


router.route('/')
.get(adminController.renderAdminPage)
.post(adminController.getLists); 

router.route('/readProduct').post(adminController.readProduct);
router.route('/readCustomer').post(adminController.readCustomer);
router.route('/readOrder').post(adminController.readOrder);

module.exports = router;
