const Cart = require('../models/Cart');

const createCart = async (customerID, products) => {
    const Cart = new Cart({
        CustomerID : customerID,
        Products : products
    });

    for(let i=0;i<products.length;i++){
        Cart.price+= products[i].price;
    }

    return await Cart.save();
};
const getCartById = async (id) => {
    return await Cart.findById(id);
};
const updateCart = async (id, products) => {
    const Cart = await getCartById(id);
    if (!Cart)
        return null;
    Cart.Products = products;
    Cart.price = 0;
    for(let i=0;i<products.length;i++){
        Cart.price+= products[i].price;
    }
    await Cart.save();
    return Cart;
};
//---------------------------- ONLY FOR ADMINS!!!!---------------------------------
const getAllCarts = async () => {
    return await Cart.find({});
};
const deleteCart = async (id) => {
    const Cart = await getCartById(id);
    if (!Cart)
        return null;

    await Cart.remove();
    return Cart;
};
module.exports = {
    createCart,
    getCartById,
    getAllCarts,
    updateCart,
    deleteCart
}