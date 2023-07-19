const Cart = require('../models/CartModel');
const productService=require('../services/ProductService')


const createCart = async (customerID, products) => {
    const cart = new Cart({
        CustomerID : customerID,
        Products : products,
        Price : 0
    });

    return await cart.save();
};
const getCartByCustomerId = async (customerId) => {
    return await Cart.findOne({CustomerID: customerId}).populate('Products');
};
const addToCart = async (customerID, productID) => {
    let cart = await getCartByCustomerId(customerID);
    if (!cart)
        return null;
        var product = await productService.getProductById(productID)
    await cart.Products.push(product)
    cart.Price+=product.Price;
    await cart.save();
    return cart;
};


const removeFromCart = async (customerID, productID) => {
    return await Cart.updateOne({customerID : customerID},{$pull : {Products : productID}})
};
//---------------------------- ONLY FOR ADMINS!!!!---------------------------------
const getAllCarts = async () => {
    return await Cart.find({});
};
const deleteCart = async (customerID) => {
    const cart = await getCartById(customerID);
    if (!cart)
        return null;

    await cart.remove();
    return cart;
};
module.exports = {
    createCart,
    getCartByCustomerId,
    getAllCarts,
    addToCart,
    removeFromCart,
    deleteCart
}