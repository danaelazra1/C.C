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
    return await Cart.findOne({CustomerID: customerId});
};
const addToCart = async (customerID, productID) => {
    const cart = await getCartByCustomerId(customerID);
    if (!cart)
        return null;
        var product = await productService.getProductById(productID)
        console.log(product)
    await cart.Products.push(product)
    cart.Price+=product.Price;
    await cart.save();
    return cart;
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
    deleteCart
}