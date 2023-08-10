const express = require('express');
const adminController = require('../controllers/AdminController')
var router = express.Router();


router.route('/')
.get(adminController.renderAdminPage)
.post(adminController.getLists); 

router.route('/readProduct').post(adminController.readProduct);
router.route('/createNewProduct').post(adminController.createNewProduct);
router.route('/updateAProduct').post(adminController.updateAProduct);
router.route('/deleteAProduct').post(adminController.deleteAProduct);
router.route('/readCustomer').post(adminController.readCustomer);
router.route('/updateACustomer').post(adminController.updateACustomer);
router.route('/deleteACustomer').post(adminController.deleteACustomer);
router.route('/readOrder').post(adminController.readOrder);

module.exports = router;
