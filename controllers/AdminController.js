const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const productService = require('../services/ProductService')
const cartService = require('../services/CartService')

var Cust = null;
var products;

async function cAndcRender(req,res){
  products = await productService.getAllProducts();
  res.render("c&c",{Cust:Cust , Products : products})
}

async function renderAdminPage(req,res){
   // --------------await operations-------------------
   const User = await UserService.getUserById(req.session.UserID);
    if(User == null || !User.isAdmin){
        cAndcRender(req,res);
    }
    else{
        res.render("admin");
    }
    
   
}

function getAdminIndex(req,res){
    
}


module.exports = {
    renderAdminPage,

}