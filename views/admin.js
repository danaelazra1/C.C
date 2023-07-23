$(document).ready(function(){
    loadLists();

}) 

function loadLists(){
    $(".productList").empty();
    $(".customerList").empty();
    $(".orderList").empty(); 
    $.ajax({
        method: "GET", // check if OK instead of POST
        url: "/admin", // could be just / ?
        success : function(res){
            res.Products.forEach(product => { 
                let item = $('<div class="product-item"></div>');
                let name = $('<h6>'+product.ProductName+'</h6>');
                let price = $('<h6>'+product.Price+'</h6>'); 
                let numberOfOrders = $('<h6>'+product.NumberOfOrders+'</h6>');
                let dateBaked = $('<h6>'+product.DateBaked+'</h6>');
                let description = $('<h6>'+product.Description+'</h6>');
                item.append([name,price,numberOfOrders,dateBaked,description]);
                $(".productList").append(item);
                
                
            });

        }
    })
}