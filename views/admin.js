jQuery(function(){
    loadProducts();
    $('input:radio[name="CategoryRadioOptions"]').on("change",function(){
        console.log("Radio registered");
        if ($(this).val() == 'Product') 
        {
            loadProducts();
        }
        else if($(this).val() == 'Customer'){
            loadCustomers();
        }
        else{
            loadOrders();
        }

    }) 
    
    
    $(".presentation").on("click",".Search",function(){
        const searchCategory = $(this).val();
        const action = $(".presentation").find('input[type="radio"]:checked').val();
        // const valArray = [];
        // $(".presentation").find('input[type="radio"]').toArray().forEach(radio => valArray.push(radio.value));
        // console.log(valArray);
        const ID = $(".presentation").find('input[type="search"]').val();
        //console.log(ID);
        
        if(searchCategory == "SearchProduct") {
           if(action == "Create") {
            loadProductForm();
           }
           if(action == "Read" ){
            loadProductToRead(ID);
           }
           else if(action == "Update") {
            console.log("Update Product")
           }
           else {
            console.log("Delete Product")
           }
        } 
        else if(searchCategory == "SearchCustomer") {
            if(action == "Read" ){
             loadCustomerToRead(ID);
            }
            else if(action == "Update") {
             console.log("Update Customer")
            }
            else {
             console.log("Delete Customer")
            }
         }
         else {
            if(action == "Read" ){
            loadOrderToRead(ID);
           }
           else if(action == "Update") {
            console.log("Update Order")
           }
           else {
            console.log("Delete Order")
           }
        }

    })

    $(".presentation").on("click",".List",function(){
        const listCategory = $(this).val();
        
        if(listCategory == "ListAllProducts") {
            listProducts();
        } 
        else if(listCategory == "ListAllCustomers") {
            listCustomers();
        }
        else {
            listOrders();
        }
    }) 

    $(".presentation").on("click","#CreateRadio",function(){
        loadProductForm();
    })

}) 


function loadProducts(){
    // $(".productList").empty();
    // $(".customerList").empty();
    // $(".orderList").empty(); 
    $(".presentation").empty();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){
            let ProductAdminControl = $('<div class="ProductAdminControl"></div>');
            $(".presentation").append(ProductAdminControl);
            let productTable = $('<table name="productTable" class="productTable"></table>');
            $(".presentation").append(productTable);

            let SearchProductID =$('<div class="input-group"><input class="form-control border-end-0 border rounded-pill" type="search" name="SearchProductID" placeholder="Enter ID" id="search-input">\
                                    <div class="input-group-append"><button type="submit" id="SearchProduct" value="SearchProduct" class="btn bg-white border-bottom-0 border rounded-pill ms-n5 Search"><i class="fa fa-search"></i></button>\
                                    <button class="btn bg-white border-bottom-0 border rounded-pill ms-n5 List" type="submit" id="ListALLProducts" value="ListAllProducts">List All</button></div></div>');
            let ProductAction =$('<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="ReadRadio" value="Read" checked><label class="form-check-label" for="ReadRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="CreateRadio" value="Create"><label class="form-check-label" for="CreateRadio">Create</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="UpdateRadio" value="Update"><label class="form-check-label" for="UpdateRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="DeleteRadio" value="Delete"><label class="form-check-label" for="DeleteRadio">Delete</label></div>');
            $(".ProductAdminControl").append([SearchProductID,ProductAction]);                      

            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productTable").append(header);
            res.Products.forEach(product => { 
                let item = $('<tr class="product-item"></tr>');
                let id = $('<td>'+product._id+'</td>');
                // let img = $('<img class="resize" src='+product.Picture+' class="card-img-top">') Need to add in item.append and Header to work
                let name = $('<td>'+product.ProductName+'</td>');
                let price = $('<td>'+product.Price+'</td>'); 
                let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
                let dateBaked = $('<td>'+product.DateBaked+'</td>');
                let description = $('<td>'+product.Description+'</td>');
                item.append([id,name,price,numberOfOrders,dateBaked,description]);
                $(".productTable").append(item);
                
                
            });
            
        }
    })
} 

function listProducts(){

    $(".productTable").detach();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){
            let productTable = $('<table name="productTable" class="productTable"></table>');
            $(".presentation").append(productTable);                   
            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productTable").append(header);

            res.Products.forEach(product => { 
                let item = $('<tr class="product-item"></tr>');
                let id = $('<td>'+product._id+'</td>');
                // let img = $('<img class="resize" src='+product.Picture+' class="card-img-top">') Need to add in item.append and Header to work
                let name = $('<td>'+product.ProductName+'</td>');
                let price = $('<td>'+product.Price+'</td>'); 
                let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
                let dateBaked = $('<td>'+product.DateBaked+'</td>');
                let description = $('<td>'+product.Description+'</td>');
                item.append([id,name,price,numberOfOrders,dateBaked,description]);
                $(".productTable").append(item);
                
            });
            
        }
    })
} 


function loadProductToRead(ID){
    $.ajax({
        method: "POST",
        url: "/admin/readProduct",
        data: {ProductID:ID},
        success: function(res){
            $(".productTable").detach();
            let productTable = $('<table name="productTable" class="productTable"></table>');
            $(".presentation").append(productTable);
            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productTable").append(header);
            product = res.Product; 
            let item = $('<tr class="product-item"></tr>');
            let id = $('<td>'+product._id+'</td>');
            // let img = $('<img class="resize" src='+product.Picture+' class="card-img-top">') Need to add in item.append and Header to work
            let name = $('<td>'+product.ProductName+'</td>');
            let price = $('<td>'+product.Price+'</td>'); 
            let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
            let dateBaked = $('<td>'+product.DateBaked+'</td>');
            let description = $('<td>'+product.Description+'</td>');
            item.append([id,name,price,numberOfOrders,dateBaked,description]);
            $(".productTable").append(item);

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error loading product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }

    })
} 

function loadProductForm(){
    $(".productTable").detach();
    $.ajax({
        method: "POST",
        url: "/admin/readProduct",
        data: {ProductID:ID},
        success: function(res){
            let productTable = $('<table name="productTable" class="productTable"></table>');
            $(".presentation").append(productTable);
            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productTable").append(header);
            product = res.Product; 
            let item = $('<tr class="product-item"></tr>');
            let id = $('<td>'+product._id+'</td>');
            // let img = $('<img class="resize" src='+product.Picture+' class="card-img-top">') Need to add in item.append and Header to work
            let name = $('<td>'+product.ProductName+'</td>');
            let price = $('<td>'+product.Price+'</td>'); 
            let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
            let dateBaked = $('<td>'+product.DateBaked+'</td>');
            let description = $('<td>'+product.Description+'</td>');
            item.append([id,name,price,numberOfOrders,dateBaked,description]);
            $(".productTable").append(item);

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error loading product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }

    })
} 

function loadCustomers(){
    // $(".productList").empty();
    // $(".customerList").empty();
    // $(".orderList").empty(); 
    $(".presentation").empty();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){

            let CustomerAdminControl = $('<div class="CustomerAdminControl"></div>');
            $(".presentation").append(CustomerAdminControl);
            let customerTable = $('<table class="customerTable"></table>');
            $(".presentation").append(customerTable);

            let SearchCustomerID =$('<div class="input-group"><input class="form-control border-end-0 border rounded-pill" type="search" name="SearchCustomerID" placeholder="Enter ID" id="search-input">\
                                    <div class="input-group-append"><button id="SearchCustomer" class="btn bg-white border-bottom-0 border rounded-pill ms-n5 Search" type="submit" value="SearchCustomer"><i class="fa fa-search"></i></button>\
                                    <button class="btn bg-white border-bottom-0 border rounded-pill ms-n5 List" type="submit" id="ListALLCustomers" value="ListAllCustomers">List All</button></div></div>');
            let CustomerAction =$('<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="CustomerActionRadioOptions" id="ReadRadio" value="Read" checked><label class="form-check-label" for="ReadRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="CustomerActionRadioOptions" id="UpdateRadio" value="Update"><label class="form-check-label" for="UpdateRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="CustomerActionRadioOptions" id="DeleteRadio" value="Delete"><label class="form-check-label" for="DeleteRadio">Delete</label></div>');
            $(".CustomerAdminControl").append([SearchCustomerID,CustomerAction]);                      

            let header = $('<tr><th>ID</th><th>Username</th><th>Name</th><th>Phone Number</th><th>Address</th><th>Orders</th></tr>') 
            $(".customerTable").append(header);
            res.Customers.forEach(customer => { 
                let item = $('<tr class="customer-item"></tr>');
                let id = $('<td>'+customer._id+'</td>');
                let username = $('<td>'+customer.Username+'</td>');
                let name = $('<td>'+customer.Name+'</td>'); 
                let phoneNumber = $('<td>'+customer.phoneNumber+'</td>');
                let address = $('<td>'+customer.Address+'</td>');
                let orders = $('<td>'+customer.Orders+'</td>');
                item.append([id,username,name,phoneNumber,address,orders]);
                $(".customerTable").append(item);
                
                
            });

        }
    })
} 

function listCustomers(){

    $(".customerTable").detach();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){
            let customerTable = $('<table class="customerTable"></table>');
            $(".presentation").append(customerTable);
            let header = $('<tr><th>ID</th><th>Username</th><th>Name</th><th>Phone Number</th><th>Address</th><th>Orders</th></tr>') 
            $(".customerTable").append(header);

            res.Customers.forEach(customer => { 
                let item = $('<tr class="customer-item"></tr>');
                let id = $('<td>'+customer._id+'</td>');
                let username = $('<td>'+customer.Username+'</td>');
                let name = $('<td>'+customer.Name+'</td>'); 
                let phoneNumber = $('<td>'+customer.phoneNumber+'</td>');
                let address = $('<td>'+customer.Address+'</td>');
                let orders = $('<td>'+customer.Orders+'</td>');
                item.append([id,username,name,phoneNumber,address,orders]);
                $(".customerTable").append(item);
                
            });
            
        }
    })
}

function loadCustomerToRead(ID){
    $.ajax({
        method: "POST",
        url: "/admin/readCustomer",
        data: {CustomerID:ID},
        success: function(res){
            $(".customerTable").detach();
            let customerTable = $('<table class="customerTable"></table>');
            $(".presentation").append(customerTable);
            let header = $('<tr><th>ID</th><th>Username</th><th>Name</th><th>Phone Number</th><th>Address</th><th>Orders</th></tr>') 
            $(".customerTable").append(header);
            customer = res.Customer; 
            let item = $('<tr class="customer-item"></tr>');
            let id = $('<td>'+customer._id+'</td>');
            let username = $('<td>'+customer.Username+'</td>');
            let name = $('<td>'+customer.Name+'</td>'); 
            let phoneNumber = $('<td>'+customer.phoneNumber+'</td>');
            let address = $('<td>'+customer.Address+'</td>');
            let orders = $('<td>'+customer.Orders+'</td>');
            item.append([id,username,name,phoneNumber,address,orders]);
            $(".customerTable").append(item);

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error loading product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }

    })
}

function loadOrders(){
    // $(".productList").empty();
    // $(".customerList").empty();
    // $(".orderList").empty(); 
    $(".presentation").empty();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){

            let OrderAdminControl = $('<div class="OrderAdminControl"></div>');
            $(".presentation").append(OrderAdminControl);
            let orderTable = $('<table class="orderTable"></table>');
            $(".presentation").append(orderTable);

            let SearchOrderID =$('<div class="input-group"><input class="form-control border-end-0 border rounded-pill" type="search" name="SearchOrderID" placeholder="Enter ID" id="search-input">\
                                    <div class="input-group-append"><button id="SearchOrder" class="btn bg-white border-bottom-0 border rounded-pill ms-n5 Search" type="submit" value="SearchOrder"><i class="fa fa-search"></i></button>\
                                    <button class="btn bg-white border-bottom-0 border rounded-pill ms-n5 List" type="submit" id="ListALLOrders" value="ListAllOrders">List All</button></div></div>');
            let OrderAction =$('<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="OrderActionRadioOptions" id="ReadRadio" value="Read" checked><label class="form-check-label" for="ReadRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="OrderActionRadioOptions" id="UpdateRadio" value="Update"><label class="form-check-label" for="UpdateRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="OrderActionRadioOptions" id="DeleteRadio" value="Delete"><label class="form-check-label" for="DeleteRadio">Delete</label></div>');
            $(".OrderAdminControl").append([SearchOrderID,OrderAction]);                      

            let header = $('<tr><th>ID</th><th>Quantity</th><th>Products</th><th>Price</th><th>Date</th><th>Sniff</th></tr>') 
            $(".orderTable").append(header);
            res.Orders.forEach(order => { 
                let item = $('<tr class="order-item"></tr>');
                let id = $('<td>'+order._id+'</td>');
                let quantity = $('<td>'+order.Quantity+'</td>');
                let products = $('<td>'+order.Products+'</td>'); 
                let price = $('<td>'+order.Price+'</td>');
                let date = $('<td>'+order.Date+'</td>');
                let sniff = $('<td>'+order.Sniff+'</td>');
                item.append([id,quantity,products,price,date,sniff]);
                $(".orderTable").append(item);
                
                
            });

        }
    })
} 

function listOrders(){

    $(".orderTable").detach();
    $.ajax({
        method: "POST", 
        url: "/admin", 
        success : function(res){
            let orderTable = $('<table class="orderTable"></table>');
            $(".presentation").append(orderTable);
            let header = $('<tr><th>ID</th><th>Quantity</th><th>Products</th><th>Price</th><th>Date</th><th>Sniff</th></tr>') 
            $(".orderTable").append(header);

            res.Orders.forEach(order => { 
                let item = $('<tr class="order-item"></tr>');
                let id = $('<td>'+order._id+'</td>');
                let quantity = $('<td>'+order.Quantity+'</td>');
                let products = $('<td>'+order.Products+'</td>'); 
                let price = $('<td>'+order.Price+'</td>');
                let date = $('<td>'+order.Date+'</td>');
                let sniff = $('<td>'+order.Sniff+'</td>');
                item.append([id,quantity,products,price,date,sniff]);
                $(".orderTable").append(item);
                
            });
            
        }
    })
}
 
function loadOrderToRead(ID){
    $.ajax({
        method: "POST",
        url: "/admin/readOrder",
        data: {OrderID:ID},
        success: function(res){
            $(".orderTable").detach();
            let orderTable = $('<table class="orderTable"></table>');
            $(".presentation").append(orderTable);
            let header = $('<tr><th>ID</th><th>Quantity</th><th>Products</th><th>Price</th><th>Date</th><th>Sniff</th></tr>') 
            $(".orderTable").append(header);
            order = res.Order; 
            let item = $('<tr class="order-item"></tr>');
            let id = $('<td>'+order._id+'</td>');
            let quantity = $('<td>'+order.Quantity+'</td>');
            let products = $('<td>'+order.Products+'</td>'); 
            let price = $('<td>'+order.Price+'</td>');
            let date = $('<td>'+order.Date+'</td>');
            let sniff = $('<td>'+order.Sniff+'</td>');
            item.append([id,quantity,products,price,date,sniff]);
            $(".orderTable").append(item);
        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error loading product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }

    })
}