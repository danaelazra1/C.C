const ws = new WebSocket("ws://localhost:8080");
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

 // ajax request - no need for page refreshing
 $(document).ready(function(){
    $('form').on('submit',function(event){
        event.preventDefault();
        let productID = $(this).children('').val();
        $.ajax({
            type : "POST",
            url : "/addProduct",
            data :{productID : productID},
            success : function(res){
                alert("Product added to cart")
            }
        })
    })
})
    