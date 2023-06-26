const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const productService = require('../services/ProductService')
const cartService = require('../services/CartService')


async function renderAdminPage(req,res){
   // --------------await operations-------------------
   
    res.render('/admin')
}

function getAdminIndex(req,res){
    
}


module.exports = {
    renderAdminPage,

}