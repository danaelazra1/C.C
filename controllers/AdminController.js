const CustomerService = require('../services/CustomerService');
const UserService = require('../services/UserService');
const productService = require('../services/ProductService');
const cartService = require('../services/CartService');
const orderService = require('../services/OrderService');
const ObjectId = require('mongodb').ObjectId;


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

        res.render("admin");
    } 
    
} 

async function getLists(req,res){
    const productList = await productService.getAllProducts();
    const customerList = await CustomerService.getAllCustomers();
    const orderList = await orderService.getAllOrders();
    res.status(200);
    res.send({Products:productList, Customers:customerList, Orders:orderList});
} 

// Responsible for String Validation for each relevant function
function isValidString(input){
    if (!input || typeof input !== "string" || input.trim() === '') { return false;}
    return true;
}

// Responsible for Number Validation for each relevant function
function isValidNumber(input){
    if (!input || isNaN(input) || input.trim() === '') { return false;}
    return true;
}

// Responsible for ID Validation for each relevant function
function isValidID(id){
    if (!isValidString(id)) { return false;}
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id) // Needed because ObjectId.isValid(id) allows Strings with length of 12 that aren't ObjectIDs.
            return true;                      // Checks if (new ObjectId created from string) cast to string, is the same Type of String       
        return false;
    }
    return false;
} 

// Responsible for Date Validation for each relevant function
function isValidDate(input){
    if (!input || isNaN(Date.parse(input)) || input.trim() === '') { return false;}
    return true;
} 
//Phone Number Validation
function isValidPhoneNumber(input){
    phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!input || !input.match(phoneRegex) || input.trim() === '') { return false;}
    return true;
} 

async function readProduct(req,res){
    
    const productId = req.body.ProductID;

    // Check if the ProductID is provided and is a valid ID
    if (!(isValidID(productId))) {
        return res.status(400).send({ error: 'Invalid Product ID' });
    }

    try {
        const product = await productService.getProductById(productId);
        // Check if a product with the given ProductID was found
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send({ Product: product });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function createNewProduct(req,res){
    
    const product = req.body.Product;
    if (!isValidString(product[0])) { return res.status(400).send({ error: 'Invalid Product Name' })}
    if (!isValidNumber(product[1])) { return res.status(400).send({ error: 'Invalid Product Price' })}
    if (!isValidString(product[2])) { return res.status(400).send({ error: 'Invalid Product Description' })}
    if (!isValidString(product[3])) { return res.status(400).send({ error: 'Invalid Product Picture' })}
    try {
        await productService.createProduct(product[0],product[1],product[2],product[3]);
        res.status(201).send({ Product: product[0] });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function updateAProduct(req,res){
    
    const product = req.body.Product;
    if (!isValidID(product[0])) { return res.status(400).send({ error: 'ID Altered! Do Not Delete The ID Field!' })}
    if (!isValidString(product[1])) { return res.status(400).send({ error: 'Invalid Product Name' })}
    if (!isValidNumber(product[2])) { return res.status(400).send({ error: 'Invalid Product Price' })}
    if (!isValidDate(product[3])) { return res.status(400).send({ error: 'Invalid Date. Enter as (Year-Month-Date Time) format' })}
    if (!isValidString(product[4])) { return res.status(400).send({ error: 'Invalid Product Description' })}
    if (!isValidString(product[5])) { return res.status(400).send({ error: 'Invalid Product Picture' })}
    try {
        const UpdatedProduct = await productService.updateProduct(product[0],product[1],product[2],new Date(product[3]),product[4],product[5]);
        if (!UpdatedProduct) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ Product: product[1] });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function deleteAProduct(req,res){
    
    const productId = req.body.ProductID;

    // Check if the ProductID is provided and is a valid ID
    if (!(isValidID(productId))) {
        return res.status(400).send({ error: 'ID Altered! Do Not Delete The ID Field!' });
    }

    try {
        const product = await productService.deleteProduct(productId);
        // Check if a product with the given ProductID was found
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        const productName = await productService.getProductById(productId).ProductName;
        res.status(200).send({ Product: productName });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function readCustomer(req,res){

    const customerId = req.body.CustomerID;

    // Check if the CustomerID is provided and is a valid ID
    if (!(isValidID(customerId))) {
        return res.status(400).send({ error: 'Invalid Customer ID' });
    }

    try {
        const customer = await CustomerService.getCustomerById(customerId);
        // Check if a customer with the given CustomerID was found
        if (!customer) {
            return res.status(404).send({ error: 'Customer not found' });
        }

        res.status(200).send({ Customer: customer });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function updateACustomer(req,res){
    
    const customer = req.body.Customer;
    if (!isValidID(customer[0])) { return res.status(400).send({ error: 'ID Altered! Do Not Delete The ID Field!' })}
    if (!isValidString(customer[1])) { return res.status(400).send({ error: 'Invalid Customer Name' })}
    if (!isValidPhoneNumber(customer[2])) { return res.status(400).send({ error: 'Invalid Phone Number' })}
    if (!isValidString(customer[3])) { return res.status(400).send({ error: 'Invalid Address' })}
    try {
        const UpdatedCustomer = await CustomerService.updateCustomer(customer[0],customer[1],customer[2],customer[3]);
        if (!UpdatedCustomer) {
            return res.status(404).send({ error: 'Customer not found' });
        }
        res.status(200).send({ Customer: customer[1] });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

async function deleteACustomer(req,res){

    const customerId = req.body.CustomerID;

    // Check if the CustomerID is provided and is a valid ID
    if (!(isValidID(customerId))) {
        return res.status(400).send({ error: 'ID Altered! Do Not Delete The ID Field!' });
    }

    try {
        const cart = await cartService.deleteCart(customerId);
        // Check if a customer with the given CustomerID has a cart found
        // if (!cart) {
        //     return res.status(404).send({ error: 'Cart not found' });
        // }

    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    } 
    try {
        const user = await UserService.deleteUser(customerId);
        //Check if a customer with the given CustomerID has a user found
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }  

    try {
        const customer = await CustomerService.deleteCustomer(customerId);
        // Check if a customer with the given CustomerID was found
        if (!customer) {
            return res.status(404).send({ error: 'Customer not found' });
        }

        res.status(200).send({ Customer: customer });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
} 


async function readOrder(req,res){

    const orderId = req.body.OrderID;

    // Check if the OrderID is provided and is a valid ID
    if (!(isValidID(orderId))) {
        return res.status(400).send({ error: 'Invalid Order ID' });
    }

    try {
        const order = await orderService.getOrderById(orderId);
        // Check if a order with the given OrderID was found
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }

        res.status(200).send({ Order: order });
    } catch (error) {
         // Handle any errors that may occur during the database operation
        console.error('Error fetching product:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


module.exports = {
    renderAdminPage,
    getLists,
    readProduct,
    createNewProduct,
    updateAProduct,
    deleteAProduct,
    readCustomer,
    updateACustomer,
    deleteACustomer,
    readOrder

}