const ws = new WebSocket("ws://localhost:8080");
var customer = new Customer(1,"test","050404034","test",[],new Cart([]));// customer details send from server -- Only after login
var products = [new Product(0,"test1",999,0,null,"kkk")]; // insert products from the server
let cart;
if(customer!== null){
 cart = customer.cart; 
}else{
  cart= new Cart([]);
}


let buttons = $('div .card-body button').each(function(index){  // all buttons of cookies package
  $(this).on("click", ()=>{ // adds the option to add item to cart
    console.log("adding btn #"+index+" logics");
    addToCart(index);
    })
}); 
   function addToCart(cookieId){
    cart.addProduct(products[cookieId])
    console.log(cart)
    //update DB - Cart
    }