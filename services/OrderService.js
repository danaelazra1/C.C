const Order = require('../models/OrderModel').OrderModel;

const createOrder = async (products, sniff) => {
    const Order = new Order({
        Products : products,
        Date : Date.now,
        Sniff : sniff
    });
    for(let i=0;i<products.length;i++){
        Order.Price += products[0].price
    }
    Order.Quantity = products.length;
    return await Order.save();
};

const getOrderById = async (id) => {
    return await Order.findById(id);
};

const getAllOrders = async () => {
    return await Order.find({});
};

const updateOrderProducts = async (id, products) => {
    const Order = await getOrderById(id);
    if (!Order)
        return null;

    Order.Products = products;
    Order.Quantity = products.length;
    Order.price = 0;
    for(let i=0;i<products.length;i++){
        Order.Price += products[0].price
    }
    Order.Date = Date.now;
    await Order.save();
    return Order;
};
const updateOrderSniff = async (id, sniff) => {
    const Order = await getOrderById(id);
    if (!Order)
        return null;

    Order.Sniff = sniff
    Order.Date = Date.now;
    await Order.save();
    return Order;
};
const deleteOrder = async (id) => {
    const Order = await getOrderById(id);
    if (!Order)
        return null;

    await Order.remove();
    return Order;
};

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderProducts,
    updateOrderSniff,
    deleteOrder
}