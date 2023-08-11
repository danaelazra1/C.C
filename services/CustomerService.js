const Customer = require('../models/CustomerModel');
//creating customer is auto after registration
// ID attribute is taken from registered Users
const createCustomer = async (id, username, name, phoneNumber, address) => {
    const customer = new Customer({
        _id : id,
        Username : username,
        Name : name,
        phoneNumber : phoneNumber,
        Address : address
    });
    return await customer.save();
};
const getCustomerById = async (id) => {
    return await Customer.findById(id);
};
const getAllCustomers = async () => {
    return await Customer.find({});
};
const updateCustomer = async (id, name, phoneNumber, address) => {
    const customer = await getCustomerById(id);
    if (!customer)
        return null;

    customer.Name =name;
    customer.phoneNumber = phoneNumber;
    customer.Address = address;
    await customer.save();
    return customer;
//*after order is created maybe need to update customer orders */
};
 //------------------------------ ONLY FOR ADMINS!!!!----------------------------
const deleteCustomer = async (id) => {
    const customer = await getCustomerById(id);
    if (!customer)
        return null;
    // DELETE CUSTOMER CART && USER
    await customer.remove();
    return customer;
};
module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
}