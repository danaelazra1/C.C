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
// ----------------------------- Rendering pages ------------------------------------
function getIndex(req,res){
  // if(req.session.username != null){
  //   Cust = custService.getCustomerById(req.session.username);
  //   var cart = cartService.getCartByCustomerId(Cust.id);
  // }
cAndcRender(req,res);
}
function getAmsterdam(req,res){
  res.render("amsterdam")
  }
function getAllCookies(req,res){
res.render("allcookies")
}
function getMAndM(req,res){
res.render("m&m");
}
function getChoclateChipsCookies(req,res){
  res.render("chocolate");
}
function getSpecialCookies(req,res){
    res.render("special");
}
function getCart(req,res){
      res.render("cart");
}
function GetLogin(req,res){
  res.render('login',{});
  }
function GetRegister(req,res){
    res.render('register',{});
  }


 // ------------------------------ CRUD ++ ------------------------------------
async function addProductToCart(req,res){
if(req.session.UserID!= null){ //user is logged in
 await cartService.addToCart(req.session.UserID,req.body.productID )
}
}
const getAllCustomers = async (req, res) => {
    const Customers = await CustomerService.getAllCustomers();
    res.json(Customers);
};

const getCustomer = async (req, res) => {
    const Customer = await CustomerService.getCustomerById(req.params.id); // req.params.id -- get method - no security needed
    if (!Customer) {
        return res.status(404).json({ errors: ['Customer not found'] });
    }

    res.json(Customer);
};

const updateCustomer = async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        message: "CustomerID is required",
      });
    }
  
    const Customer = await CustomerService.updateCustomer(req.params.id, req.body.name, req.body.phoneNumber, req.body.address);
    if (!Customer) {
      return res.status(404).json({ errors: ['Customer not found'] });
    }
  
    res.json(Customer);
  };

const deleteCustomer = async (req, res) => {
    const Customer = await CustomerService.deleteCustomer(req.params.id);
    if (!Customer) {
      return res.status(404).json({ errors: ['Customer not found'] });
    }
  
    res.send();
  };

const createUserAdmin = async (req, res) => {
        const newUser = await UserService.createUser(req.body.username,req.body.password);
        if(newUser){
          res.redirect('register');
        }else{
          if(!newUser.isAdmin){
         Cust = await CustomerService.createCustomer(newUser.id,req.body.username,req.body.name,req.body.phoneNumber,req.body.address)
        req.session.UserID=newUser.id;
        await cartService.createCart(Cust.id,[]);
        cAndcRender(req,res)
          }else{
            res.render('adminPage');
          }
        }
    };
    
const UserAdminLogin = async (req, res) => {
        const User = await UserService.getUserByUsernameAndPassword(req.body.username,req.body.password);
        if (User == null) {
         res.redirect('/login');
        }else{
          if(User.isAdmin){
            res.render('adminPage');
          }else{
        req.session.UserID = User.id;
        Cust = await CustomerService.getCustomerById(User.id);
        cart = await cartService.getCartByCustomerId(User.id);
        cAndcRender(req,res)
          }
        }
      };
    
const UserLogout = async (req,res)=>{
        req.session.destroy(()=>{
            res.redirect('/login')
        })
    }



  module.exports = {
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getIndex,
    getAllCookies,
    getAmsterdam,
    getMAndM,
    getChoclateChipsCookies,
    getSpecialCookies,
    addProductToCart,
    getCart,
    GetLogin,
    GetRegister,
    createUserAdmin,
    UserAdminLogin,
    UserLogout
  };