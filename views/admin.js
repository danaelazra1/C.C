
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
        const ID = $(".presentation").find('input[type="search"]').val();
        
        if(searchCategory == "SearchProduct") {
           if(action == "Create") {
            loadProductForm();
           }
           if(action == "Read" ){
            loadProductToRead(ID);
           }
           else if(action == "Update") {
            loadProductToUpdate(ID);
           }
           else {
            loadProductToDelete(ID);
           }
        } 
        else if(searchCategory == "SearchCustomer") {
            if(action == "Read" ){
             loadCustomerToRead(ID);
            }
            else if(action == "Update") {
            loadCustomerToUpdate(ID);
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
            //loadOrderToUpdate(ID);
           }
           else {
            console.log("Delete Order")
           }
        }

    })

    $(".presentation").on("click",".List",function(){
        const listCategory = $(this).val();
        const ReadRadioID = $(this).attr("id");
        
        if(listCategory == "ListAllProducts" || ReadRadioID == "ReadProductRadio") {
            listProducts();
        } 
        else if(listCategory == "ListAllCustomers"|| ReadRadioID == "ReadCustomerRadio") {
            listCustomers();
        }
        else {
            listOrders();
        }
    }) 

    $(".presentation").on("click","#CreateProductRadio",function(){
        loadProductForm();
    })

    $(".presentation").on("click",".product-create",function(){
        const ProductValArray = [];
        $(".presentation").find('input[type="text"]').toArray().forEach(textbox => ProductValArray.push(textbox.value));
        createProduct(ProductValArray);
    }) 

    $(".presentation").on("click",".item-update",function(){
        ItemType = $(this).val();
        
        const ID = $(".presentation").find('input[type="search"]').val();
        const ValArray = [ID];
        $(".presentation").find('input[type="text"]').toArray().forEach(textbox => ValArray.push(textbox.value));
        if(ItemType == "UpdateProduct"){
            updateProduct(ValArray);
        } 
        else if(ItemType == "UpdateCustomer"){
            updateCustomer(ValArray);
        } 
        else {
            //updateOrder(ValArray);
        }
    })

    $(".presentation").on("click",".item-delete",function(){
        ItemType = $(this).val();
        const ID = $(".presentation").find('input[type="search"]').val();
        if(ItemType == "DeleteProduct"){
            deleteProduct(ID);
        } 
        // else if(ItemType == "DeleteCustomer"){
        //     deleteCustomer(ID);
        // } 
        // else {
        //     //deleteOrder(ID);
        // }
    })

}) 

//        PRODUCT CRUD FUNCTIONS

function loadProducts(){

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
            let ProductAction =$('<div class="form-check form-check-inline"><input class="form-check-input List" type="radio" name="ProductActionRadioOptions" id="ReadProductRadio" value="Read" checked><label class="form-check-label" for="ReadRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="CreateProductRadio" value="Create"><label class="form-check-label" for="CreateProductRadio">Create</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="UpdateProductRadio" value="Update"><label class="form-check-label" for="UpdateProductRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="ProductActionRadioOptions" id="DeleteProductRadio" value="Delete"><label class="form-check-label" for="DeleteProductRadio">Delete</label></div>');
            $(".ProductAdminControl").append([SearchProductID,ProductAction]);                      

            let header = $('<tr><th>ID</th><th>Name</th><th>Price</th><th>Number Of Orders</th><th>Date Baked</th><th>Description</th></tr>') 
            $(".productTable").append(header);
            res.Products.forEach(product => { 
                let item = $('<tr class="product-item"></tr>');
                let id = $('<td>'+product._id+'</td>');
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
    let productForm = $('<div class ="container productTable"><form class ="load-form">\
                         <div class="row"><div class ="col-25"><label for="productName">Product Name</label></div><div class ="col-75">\
                         <input class="form-control border-end-0 border rounded-pill" type="text" name="productName" placeholder="Enter Name" id="productName"> </div> </div>\
                         <div class="row"><div class ="col-25"><label for="productPrice">Product Price</label></div><div class ="col-75">\
                         <input class="form-control border-end-0 border rounded-pill" type="text" name="productPrice" placeholder="Enter Price" id="productPrice"> </div> </div>\
                         <div class="row"><div class ="col-25"><label for="productDescription">Product Description</label></div><div class ="col-75">\
                         <input class="form-control border-end-0 border rounded-pill" type="text" name="productDescription" placeholder="Enter Description" id="productDescription"> </div> </div>\
                         <div class="row"><div class ="col-25"><label for="productPicture">Product Picture</label></div><div class ="col-75">\
                         <input class="form-control border-end-0 border rounded-pill" type="text" name="productPicture" placeholder="Enter Picture" id="productPicture"> </div> </div>\
                         <div class="row"><button class="btn border-bottom-0 border ms-n5 item-submit product-create" type="button" id="CreateProduct" value="CreateProduct">Submit</button></div></div>');
    $(".presentation").append(productForm);
    
} 

function createProduct(product) {
    $.ajax({
        method: "POST",
        url: "/admin/createNewProduct",
        data: {Product:product},
        success: function(res){
            alert("Product: "+res.Product+" Successfully Created");
            loadProductForm();

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error creating product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }
    })
}

function loadProductToUpdate(ID){
    $.ajax({
        method: "POST",
        url: "/admin/readProduct",
        data: {ProductID:ID},
        success: function(res){
            $(".productTable").detach();
            product = res.Product;
            let productUpdateForm = $('<div class ="container productTable"><form class ="load-form">\
                                       <div class="row"><div class ="col-25"><label for="productName">Product Name</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="productName" value="'+product.ProductName+'" placeholder="Enter Name" id="productName"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="productPrice">Product Price</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="productPrice" value="'+product.Price+'" placeholder="Enter Price" id="productPrice"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="productDate">Product Date</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="productDate" value="'+product.DateBaked+'" placeholder="Enter Date Baked" id="productDate"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="productDescription">Product Description</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="productDescription" value="'+product.Description+'" placeholder="Enter Description" id="productDescription"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="productPicture">Product Picture</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="productPicture" value="'+product.Picture+'" placeholder="Enter Picture" id="productPicture"> </div> </div>\
                                       <div class="row"><button class="btn border-bottom-0 border ms-n5 item-submit item-update" type="button" id="UpdateProduct" value="UpdateProduct">Submit Update</button></div></div>');
            $(".presentation").append(productUpdateForm);                     

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

function updateProduct(product) {
    $.ajax({
        method: "POST",
        url: "/admin/updateAProduct",
        data: {Product:product},
        success: function(res){
            alert("Product: "+res.Product+" Successfully Updated");
            listProducts();

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error creating product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }
    })
} 

function loadProductToDelete(ID){
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
            let name = $('<td>'+product.ProductName+'</td>');
            let price = $('<td>'+product.Price+'</td>'); 
            let numberOfOrders = $('<td>'+product.NumberOfOrders+'</td>');
            let dateBaked = $('<td>'+product.DateBaked+'</td>');
            let description = $('<td>'+product.Description+'</td>');
            let deleteButton = $('<td><button class="btn border-bottom-0 border ms-n5 item-submit item-delete" type="button" id="DeleteProduct" value="DeleteProduct">Confirm Delete</button></td>')
            item.append([id,name,price,numberOfOrders,dateBaked,description,deleteButton]);
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

function deleteProduct(ID) {
    $.ajax({
        method: "POST",
        url: "/admin/deleteAProduct",
        data: {ProductID:ID},
        success: function(res){
            alert("Product Successfully Deleted");
            listProducts();

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error creating product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }
    })
}

//        CUSTOMER RUD FUNCTIONS

function loadCustomers(){
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
            let CustomerAction =$('<div class="form-check form-check-inline"><input class="form-check-input List" type="radio" name="CustomerActionRadioOptions" id="ReadCustomerRadio" value="Read" checked><label class="form-check-label" for="ReadCustomerRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="CustomerActionRadioOptions" id="UpdateCustomerRadio" value="Update"><label class="form-check-label" for="UpdateCustomerRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="CustomerActionRadioOptions" id="DeleteCustomerRadio" value="Delete"><label class="form-check-label" for="DeleteCustomerRadio">Delete</label></div>');
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

function loadCustomerToUpdate(ID){
    $.ajax({
        method: "POST",
        url: "/admin/readCustomer",
        data: {CustomerID:ID},
        success: function(res){
            $(".customerTable").detach();
            customer = res.Customer;
            let customerUpdateForm = $('<div class ="container customerTable"><form class ="load-form">\
                                       <div class="row"><div class ="col-25"><label for="customerName">Customer Name</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="customerName" value="'+customer.Name+'" placeholder="Enter Name" id="customerName"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="customerPhoneNumber">Phone Number</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="customerPhoneNumber" value="'+customer.phoneNumber+'" placeholder="Enter Phone Number" id="customerPhoneNumber"> </div> </div>\
                                       <div class="row"><div class ="col-25"><label for="customerAddress">Customer Address</label></div><div class ="col-75">\
                                       <input class="form-control border-end-0 border rounded-pill" type="text" name="customerAddress" value="'+customer.Address+'" placeholder="Enter Customer Address" id="customerAddress"> </div> </div>\
                                       <div class="row"><button class="btn border-bottom-0 border ms-n5 item-submit item-update" type="button" id="UpdateCustomer" value="UpdateCustomer">Submit Update</button></div></div>');
            $(".presentation").append(customerUpdateForm);                     

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

function updateCustomer(customer) {
    $.ajax({
        method: "POST",
        url: "/admin/updateACustomer",
        data: {Customer:customer},
        success: function(res){
            alert("Customer: "+res.Customer+" Successfully Updated");
            listCustomers();

        }, 
        error: function (xhr, status, error) {
            // Handle the error and show an alert message
            console.error('Error creating product:', error);
            // xhr.responseJSON.error - XMLHttpRequest object that contains the original error sent from res.
            if (xhr.responseJSON && xhr.responseJSON.error) {
                alert(xhr.responseJSON.error);
              } else {
                alert('An unknown error occurred. Please try again later.');
              }
          }
    })
}

//        ORDER RUD FUNCTIONS

function loadOrders(){
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
            let OrderAction =$('<div class="form-check form-check-inline"><input class="form-check-input List" type="radio" name="OrderActionRadioOptions" id="ReadOrderRadio" value="Read" checked><label class="form-check-label" for="ReadOrderRadio">Read</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="OrderActionRadioOptions" id="UpdateOrderRadio" value="Update"><label class="form-check-label" for="UpdateOrderRadio">Update</label></div>\
                                  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="OrderActionRadioOptions" id="DeleteOrderRadio" value="Delete"><label class="form-check-label" for="DeleteOrderRadio">Delete</label></div>');
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