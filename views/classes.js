class Product{
    productId;
    productName;
    price;
    numberOfOrders;
    dateBaked;
    picture;
constructor(productId, productName, price, numberOfOrders, dateBaked, picture){
this.productId = productId;
this.productName = productName;
this.price = price;
this.numberOfOrders = numberOfOrders;
this.dateBaked = dateBaked;
this.picture = picture;
}
}
class Order{
    orderId;
    quantity;
    products; // array of products
    price;
    date;
    sniff;
constructor(orderId, quantity, products, price, date, sniff){
    this.orderId=orderId;
    this.quantity=quantity;
    this.products=products;
    this.price=price;
    this.date=date;
    this.sniff=sniff;
    
}
}
class Users{
    username;
    password;
    custId;
    isAdmin;
    constructor(username, password,custId, isAdmin){
    this.username=username;
    this.password=password;
    this.custId=custId;
    this.isAdmin=isAdmin;
    }
}
class Customer{
    customerId;
    name;
    phoneNumber;
    address;
    orders; // array of orders
    cart;
    constructor(customerId, name, phoneNumber, address, orders,cart){
        this.customerId=customerId;
        this.name=name;
        this.phoneNumber=phoneNumber;
        this.address=address;
        this.orders=orders;
        this.cart=cart;
    }
}
class Cart{
    customerId;
    products; // array of products
    price;
    constructor(products,customerId=null){ // user customer cart
        this.price=0
        this.customerId=customerId;
        this.products=products;
        for(let i=0;i<products.length;i++){
            this.price+=products[i].price;
        }
    }
    addProduct(product){
        this.products.push(product);
        this.price+= product.price;
    }
}