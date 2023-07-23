const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const productService = require('../services/ProductService');
const cartService = require('../services/CartService');
const orderService = require('../services/OrderService');

var Cust = null;
var products;

async function cAndcRender(req,res){
  products = await productService.getAllProducts();
  res.render("c&c",{Cust:Cust , Products : products});
}

async function renderAdminPage(req,res){
   // --------------await operations-------------------
   const User = await UserService.getUserById(req.session.UserID);
    if(User == null){
        cAndcRender(req,res);        
    }
    else if(!User.isAdmin){
        Cust = await CustomerService.getCustomerById(User.id);
        cAndcRender(req,res);
    }
    else{
        const products = await productService.getAllProducts();
        const customers = await CustomerService.getAllCustomers();
        const orders = await orderService.getAllOrders();
        res.status(200); // Need to check if required
        res.render("admin",{Products:products, Customers:customers, Orders:orders});
    }
    
   
}

function getAdminIndex(req,res){
    
}


module.exports = {
    renderAdminPage,

}