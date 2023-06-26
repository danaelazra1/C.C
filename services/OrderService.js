const Order = require('../models/OrderModel').OrderModel;

const createOrder = async (products, sniff) => {
    const order = new Order({
        Products : products,
        Date : Date.now,
        Sniff : sniff
    });
    for(let i=0;i<products.length;i++){
        order.Price += products[0].price
    }
    order.Quantity = products.length;
    return await order.save();
};

const getOrderById = async (id) => {
    return await Order.findById(id);
};

const getAllOrders = async () => {
    return await Order.find({});
};

const updateOrderProducts = async (id, products) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    order.Products = products;
    order.Quantity = products.length;
    order.price = 0;
    for(let i=0;i<products.length;i++){
        order.Price += products[0].price
    }
    order.Date = Date.now;
    await order.save();
    return order;
};
const updateOrderSniff = async (id, sniff) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    order.Sniff = sniff
    order.Date = Date.now;
    await order.save();
    return order;
};
const deleteOrder = async (id) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    await order.remove();
    return order;
};

module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderProducts,
    updateOrderSniff,
    deleteOrder
}