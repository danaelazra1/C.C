const Customer = require('../models/Customer');
//creating customer is auto after registration
// ID attribute is taken from registered Users
const createCustomer = async (id, username, name, phoneNumber, address) => {
    const Customer = new Customer({
        _id : id,
        Username : username,
        Name : name,
        phoneNumber : phoneNumber,
        Address : address
    });
    return await Customer.save();
};
const getCustomerById = async (id) => {
    return await Customer.findById(id);
};
const getAllCustomers = async () => {
    return await Customer.find({});
};
const updateCustomer = async (id, name, phoneNumber, address) => { // update details about customer
    const Customer = await getCustomerById(id);
    if (!Customer)
        return null;

    Customer.Name =name;
    Customer.phoneNumber = phoneNumber;
    Customer.Address = address;
    await Customer.save();
    return Customer;
//*after order is created maybe need to update customer orders */
};
 //------------------------------ ONLY FOR ADMINS!!!!----------------------------
const deleteCustomer = async (id) => {
    const Customer = await getCustomerById(id);
    if (!Customer)
        return null;
    // DELETE CUSTOMER CART && USER
    await Customer.remove();
    return Customer;
};
module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
}