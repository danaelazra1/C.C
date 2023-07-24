$(document).ready(function(){
    loadLists();

}) 

function loadLists(){
    $(".productList").empty();
    $(".customerList").empty();
    $(".orderList").empty(); 
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){
            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productList").append(header);
            res.Products.forEach(product => { 
                let item = $('<tr class="product-item"></tr>');
                let id = $('<td>'+product._id+'</td>');
                let name = $('<td>'+product.ProductName+'</td>');
                let price = $('<td>'+product.Price+'</td>'); 
                let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
                let dateBaked = $('<td>'+product.DateBaked+'</td>');
                let description = $('<td>'+product.Description+'</td>');
                item.append([id,name,price,numberOfOrders,dateBaked,description]);
                $(".productList").append(item);
                
                
            });

        }
    })
}