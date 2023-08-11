const Product = require('../models/ProductModel').ProductModel;

const getTop5ProductsByNumberOfOrders = async () => {
    return await Product.find({}).sort({NumberOfOrders : -1}).limit(5);
};
const getProductByName = async (productName) => {
    return await Product.findOne({productName : productName});
};
const getProductByPriceMax = async (price) => {
    return await Product.findOne({Price : {$ls : price}});
};
const getAllProducts = async () => {
    return await Product.find({}).lean();
};
const updateProductNumOfOrders = async (productID) => {
     let product = await getProductById(productID);
     product.$inc('NumberOfOrders',1);
     await product.save();
};
// ------------------------ ONLY FOR ADMINS!!--------------------------------
const getProductById = async (id) => {
    return await Product.findById(id);
};
const createProduct = async (productName, price, dateBaked=Date.now, description , picture) => {
    const product = new Product({
        ProductName : productName,
        Price : price,
        NumberOfOrders : 0,
        DateBaked : dateBaked,
        Description : description,
        Picture : picture
    });
    return await product.save();
};
const updateProduct = async (id, productName, price, dateBaked,description ,picture) => {
    const product = await getProductById(id);
    if (!product)
        return null;

    product.ProductName = productName;
    product.Price = price;
    product.Date = dateBaked;
    product.Picture = picture;
    product.Description = description;
    await product.save();
    return product;
};
const deleteProduct = async (id) => {
    const product = await getProductById(id);
    if (!product)
        return null;
    await product.remove();
    return product;
};

module.exports = {
    createProduct,
    getProductById,
    getTop5ProductsByNumberOfOrders,
    getProductByName,
    getProductByPriceMax,
    getAllProducts,
    updateProductNumOfOrders,
    updateProduct,
    deleteProduct
}