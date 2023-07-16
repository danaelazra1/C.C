const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = ()=>{
    const gotLocation = (position)=>{
        ws.send('&lat='+position.coords.latitude +'&lon=' +position.coords.longitude);
   }
   const noLocation = (err)=>{
       ws.onopen = ()=> ws.send('&q=Tel Aviv');
   }
   navigator.geolocation.getCurrentPosition(gotLocation,noLocation);
    }

    ws.onmessage= event=>{
        let wethData = JSON.parse(event.data);
        $('.weather-icon').attr('src','images/'+wethData.weather[0].main+'.png') // TODO :: weather icon by weather details
        $('.temp').text(wethData.main.temp) 
        $('.city').text(wethData.name) 
    }
    