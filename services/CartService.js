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
const clearAllitems = async (customerID) => {
return await Cart.updateOne({CustomerID : customerID},{Products :[],Price: 0})

}

const removeFromCart = async (customerID, productID) => {
    let cart = await getCartByCustomerId(customerID);
    if (!cart)
        return null;
        var product = await productService.getProductById(productID)
        cart.Price-=product.Price;
        isDeleted = false;
        for (let i = 0; i < cart.Products.length; i++) {
            if(!isDeleted){
                if(cart.Products[i]._id==productID){
                    cart.Products.splice(i,1)
                    isDeleted=true;
                }
            }
            
        }
        
    await cart.save();
    return cart;
    

};
//---------------------------- ONLY FOR ADMINS!!!!---------------------------------
const getAllCarts = async () => {
    return await Cart.find({});
};
const deleteCart = async (customerID) => {
    const cart = await getCartByCustomerId(customerID);
    if (!cart)
        return null;

        return await Cart.findByIdAndRemove(cart._id);
};
module.exports = {
    createCart,
    getCartByCustomerId,
    getAllCarts,
    clearAllitems,
    addToCart,
    removeFromCart,
    deleteCart
}