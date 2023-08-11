const ws = new WebSocket("ws://localhost:8080");
let ProductsToShow;
let CustConnected= null;

    ws.onopen = ()=>{
    const gotLocation = (position)=>{
        ws.send('&lat='+position.coords.latitude +'&lon=' +position.coords.longitude);
   }
   const noLocation = (err)=>{
    ws.send('&q=Tel Aviv');
   }
   navigator.geolocation.getCurrentPosition(gotLocation,noLocation);
    }

    ws.onmessage= (event)=>{
        let wethData = JSON.parse(event.data);
        $('.weather-icon').attr('src','images/'+wethData.weather[0].main+'.png')
        $('.temp').text(wethData.main.temp) 
        $('.city').text(wethData.name) 
    }
    function loadProducts(products){
        products.forEach(product=>{
            let card = $('<div class="card col-sm-6 col-md-4 col-lg-4"> </div>') ;
            let img = $('<img src='+ product.Picture +  ' class="card-img-top">');
            let cardBody = $('<div class="card-body"> </div>');
            let h5 = $('<h5 class="card-title">'+ product.ProductName+' : '+product.Price+'₪ </h5>');
            let p = $('<p class="card-text"> '+ product.Description +'</p><br>');
            let form = $('<form class="purchase"> <button value='+ product._id+' type="submit" class="btn btn-primary">Add to cart</button> </form>')
            cardBody.append([h5,p,form]);
            card.append([img,cardBody]);
            $('.cards').append(card);
         })
         //Add Each Product Logics to Add To Cart
         $('.purchase').on('submit',function(event){
             event.preventDefault();
             let productID = $(this).children('').val();
             $.ajax({
                 type : "POST",
                 url : "/addProduct",
                 data :{productID : productID},
                 success : function(res){
                     alert("Product added to cart")
                 },
                 error:function(res){
                     alert("Please Log in to make any purchase");
                 }
             })
         })
     
    }

function sorting(p){
    $(".cards").empty();
    switch (p) {
        case "All":
            loadProducts(ProductsToShow);
            break;
            case "BestSeller":
                ProductsToShow.sort((p1,p2)=>{
                    if(p1.NumberOfOrders<p2.NumberOfOrders){
                        return 1;
                    }
                    if(p1.NumberOfOrders>p2.NumberOfOrders){
                        return -1;
                    }
                    return 0;
                })
            let top5Best = ProductsToShow.slice(0,5);
            loadProducts(top5Best);
            break;
            case "LowToHigh":
                ProductsToShow.sort((p1,p2)=>{
                    if(p1.Price<p2.Price){
                        return -1;
                    }
                    if(p1.Price>p2.Price){
                        return 1;
                    }
                    return 0;
                })
                loadProducts(ProductsToShow);
            break;
            case "HighToLow":
                ProductsToShow.sort((p1,p2)=>{
                    if(p1.Price<p2.Price){
                        return 1;
                    }
                    if(p1.Price>p2.Price){
                        return -1;
                    }
                    return 0;
                })
                loadProducts(ProductsToShow);
            break;
        default:
            break;
    }
}
 // ajax request - no need for page refreshing
 $(document).ready(function(){
    //First Load Products
    $.ajax({
        type:"Post",
        url:"/GetProducts",
        success: function(res){
            ProductsToShow = res.products;
            loadProducts(ProductsToShow);
            
        
        }
    })
    //Load User Information
    $.ajax({
        type:"post",
        url:"/isLogged",
        success: function(res){
            CustConnected = res.Cust;
            if(CustConnected != null){
                $('#details').empty();
                let form = $('<form action="/logout"><p>Hello '+CustConnected.Name+'</p> <button id="logout" class="btn btn-primary">Logout</button></form>')
                $('#details').append(form);
            }
        }
    })
    //Sorting buttons logics
    $('.sortPref').on('change',()=>{
        let prefrence = $("input[name='selected']:checked").val();
        sorting(prefrence);
    })
   
})
