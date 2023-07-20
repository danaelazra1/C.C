const express = require('express');
const adminController = require('../controllers/AdminController')
var router = express.Router();


router.route('/')
.get(adminController.renderAdminPage);

module.exports = router;
