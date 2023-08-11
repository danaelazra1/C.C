const productService = require('../services/ProductService')


async function getAllProducts(req,res){
products = await productService.getAllProducts();
res.send({products:products});
}
async function getTop5Prod(req,res){
    products = await productService.getTop5ProductsByNumberOfOrders();
    res.send({products:products});
}

module.exports = {
getAllProducts,
getTop5Prod
}