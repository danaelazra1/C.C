const Product = require('../models/Product');

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
    return await Product.find({});
};

const updateNumberOfOrders = async (id)=>{ // TODO ::FOR EVERY PURCHASE!!!! -- ORDERS.PRODUCTS foreach updateNumberOfOrders
    const Product = await getProductById(id);
    if (!Product)
        return null;
    let oredersCount = Product.NumberOfOrders;
    Product.NumberOfOrders = oredersCount+1;
    await Product.save();
    return Product;
}
// ------------------------ ONLY FOR ADMINS!!--------------------------------
const getProductById = async (id) => {
    return await Product.findById(id);
};
const createProduct = async (productName, price, dateBaked=Date.now, picture) => {
    const Product = new Product({
        productName : productName,
        Price : price,
        NumberOfOrders : 0,
        dateBaked : dateBaked,
        Picture : picture
    });
    return await Product.save();
};
const updateProduct = async (id, productName, price, dateBaked, picture) => {
    const Product = await getProductById(id);
    if (!Product)
        return null;

    Product.productName = productName;
    Product.Price = price;
    Product.title = dateBaked;
    Product.title = picture;
    await Product.save();
    return Product;
};
const deleteProduct = async (id) => {
    const Product = await getProductById(id);
    if (!Product)
        return null;
    // TODO :: UPDATE ALL CARTS- BEFORE DELETION
    await Product.remove();
    return Product;
};

module.exports = {
    createProduct,
    getProductById,
    getTop5ProductsByNumberOfOrders,
    getProductByName,
    getProductByPriceMax,
    getAllProducts,
    updateProduct,
    deleteProduct
}