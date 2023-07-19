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
  function getMaps(req,res){
    res.render("maps");
  }
  function getAdmin(req,res){ // TODO: Migrate to AdminController 
    res.render("admin");
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


async function getCartProducts(req,res){
  let cart = await cartService.getCartByCustomerId(Cust._id);
      res.status(200);
      res.send({products : cart.Products, price : cart.Price});
}
async function getCart(req,res){
  // let cart = await cartService.getCartByCustomerId(Cust._id);
      // res.render("cart",{Cart : cart , Products : cart.Products});
      res.render('cart');
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
 await cartService.addToCart(req.session.UserID,req.body.productID)
 res.status(201);
 res.send("added to cart!")
}
}

async function removeProductFromCart(req,res){
  if(req.session.UserID!= null){ //user is logged in
   let cart = await cartService.removeFromCart(req.session.UserID,req.body.ProductID);
  res.status(202);
 res.send({products : cart.Products,price : cart.Price});
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
        const newUser = await UserService.createUser(req.body.username,req.body.password); // BUG
        if(newUser == null){
          res.redirect('register');
        }else{
          if(!newUser.isAdmin){
         Cust = await CustomerService.createCustomer(newUser.id,req.body.username,req.body.name,req.body.phoneNumber,req.body.address)
        req.session.UserID=newUser.id;
        await cartService.createCart(Cust.id,[]);
        res.redirect('/');
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
        res.redirect('/');
          }
        }
      };
    
const UserLogout = async (req,res)=>{
        req.session.destroy(()=>{
          Cust=null;
            res.redirect('/login')
        })
    }



  module.exports = {
    getAllCustomers,
    getCustomer,
    getMaps,
    updateCustomer,
    deleteCustomer,
    getIndex,
    getAllCookies,
    getAmsterdam,
    getMAndM,
    getChoclateChipsCookies,
    getSpecialCookies,
    addProductToCart,
    removeProductFromCart,
    getCart,
    getCartProducts,
    GetLogin,
    GetRegister,
    createUserAdmin,
    UserAdminLogin,
    UserLogout,
    getAdmin // TODO: Migrate to AdminController
  };