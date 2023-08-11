const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const cartService = require('../services/CartService');
const orderService = require('../services/OrderService');
 



async function cAndcRender(req,res){
  res.render("c&c")
}
// ----------------------------- Rendering pages ------------------------------------
function getIndex(req,res){
cAndcRender(req,res);
}
function getMaps(req,res){
   res.render("maps");
}
async function getCartProducts(req,res){
  if(req.session.UserID!= null){ //user is logged in
  let cart = await cartService.getCartByCustomerId(req.session.UserID);
      res.status(200);
      res.send({products : cart.Products, price : cart.Price});
  }else{
    res.status(401);
  res.send();
}

}
async function getCart(req,res){
  if(req.session.UserID!= null){ //user is logged in
      res.render('cart');
  }else{
    res.redirect('/login')
  }
}
function GetLogin(req,res){
  res.render('login',{error:null});
  }
function GetRegister(req,res){
    res.render('register',{error:null});
  }


 // ------------------------------ CRUD ++ ------------------------------------
async function addProductToCart(req,res){
if(req.session.UserID!= null){ //user is logged in
 await cartService.addToCart(req.session.UserID,req.body.productID)
 res.status(201);
 res.send();
}else{
  res.status(401);
  res.send();
}
}

async function removeProductFromCart(req,res){
  if(req.session.UserID!= null){ //user is logged in
   let cart = await cartService.removeFromCart(req.session.UserID,req.body.ProductID);
  res.status(202);
 res.send();
  }
}
async function clearAllCartItems(req,res){
  await cartService.clearAllitems(req.session.UserID);
  res.status(200);
  res.send();
}

//TODO:: nearest sniff?
async function purchaseCart(req,res){
  let defaultSniff = "Eli Vizel 2, Rishon le zion"
  //Get nearst sniff using maps
  await orderService.createOrder(req.body.cartProducts,defaultSniff,req.session.UserID);
  await cartService.clearAllitems(req.session.UserID);
  res.status(200);
  res.send();
}
const getAllCustomers = async (req, res) => {
    const Customers = await CustomerService.getAllCustomers();
    res.json(Customers);
};
const getCustomer = async (req, res) => {
    const Customer = await CustomerService.getCustomerById(req.session.UserID);
    res.send({Cust:Customer});
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
        if(newUser == null){
          res.render('register',{error: "Cannot create user, username is taken"});
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
         res.render('login',{error:"Invalid username or password"});
        }else{
          if(User.isAdmin){
            res.render('adminPage');
          }else{
        req.session.UserID = User.id;
        res.redirect('/');
          }
        }
      };
const UserLogout = async (req,res)=>{
        req.session.destroy(()=>{
          Cust=null;
            res.redirect('/')
        })
    }
  module.exports = {
    getAllCustomers,
    getCustomer,
    getMaps,
    updateCustomer,
    deleteCustomer,
    getIndex,
    clearAllCartItems,
    addProductToCart,
    removeProductFromCart,
    purchaseCart,
    getCart,
    getCartProducts,
    GetLogin,
    GetRegister,
    createUserAdmin,
    UserAdminLogin,
    UserLogout
  };