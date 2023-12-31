const Order = require('../models/OrderModel').OrderModel;
const productService = require('./ProductService');
const customerService = require('./CustomerService')

const createOrder = async (products, sniff,customerID) => {
    const order = new Order({
        Products : products,
        Date : Date.now(),
        Sniff : sniff,
        Price : 0
    });
    for(let i=0;i<products.length;i++){
        productService.updateProductNumOfOrders(products[i]._id);
        order.Price += parseInt(products[i].Price)
    }
    order.Quantity = products.length;
    //Create order at customer
    let customer =await  customerService.getCustomerById(customerID);
    customer.Orders.push(order);
    await customer.save();
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