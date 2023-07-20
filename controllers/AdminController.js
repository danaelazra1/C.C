const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const productService = require('../services/ProductService')
const cartService = require('../services/CartService')


async function renderAdminPage(req,res){
   // --------------await operations-------------------
   const User = await UserService.getUserById(req.session.UserID);
    if(User == null){
        res.send("Unauthorized");
        return;
    }
    if(User.isAdmin){
        res.render("admin");
    }
    // else {    Needed Not Admin
        
    // }
   
}

function getAdminIndex(req,res){
    
}


module.exports = {
    renderAdminPage,

}