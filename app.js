//----------------------Server INIT-----------------------
const express = require('express');
const webSocket = require('ws');
const http = require('http');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname+'/views'));
app.use(bodyParser.json());
app.set('view engine','ejs'); // future it will be ejs
const wsServer = new webSocket.Server({server:server}); // webSocket initialization with express server

// wsServer.on()

//----------------------DB INIT----------------------
// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient;
// const connectionURL = 'mongodb://localhost/27017'
// const dataBaseName = 'CookieBase'

//Login Success returns Cusotmer obj{.....cart}
// GET_ALL_PRODUCTS! --> to array



//-------------------------- A Connection to the DB------------------------
// mongoClient.connect(connectionURL,{useNewUrlParser : true},(err,client)=>{
//     client.db
// })




//--------------------------- Server Actions------------------------------
// did not used router- dont have same path with diffrent requests
app.get('/',(req,res)=>{
    res.render('c&c'); //render uses the template engine given on the set('engine-view',value) function
})
app.get('/login' , (req,res)=>{
  res.render('login'); // 
})
app.get('/allcookies' , (req,res)=>{
  res.render('allcookies'); // 
})
app.get('/amsterdam' , (req,res)=>{
  res.render('amsterdam'); // 
})
app.get('/m&m' , (req,res)=>{
  res.render('m&m'); // 
})
app.get('/chocolate' , (req,res)=>{
  res.render('chocolate'); // 
})
app.get('/special' , (req,res)=>{
  res.render('special'); // 
})
app.get('/cart' , (req,res)=>{
  res.render('cart'); // 
})
app.post('/',(req,res)=>{

})
app.post('/',(req,res)=>{

})
app.post('/',(req,res)=>{

})
server.listen(process.env.SERVER_PORT); // process.env."ENV.PROPERTY"

//--------------------------------Socket Actions------------------------------------
// socket.on('connection', function connection(ws) {
//     ws.on('error', console.error);
  
//     ws.on('message', function message(data) {
//       console.log('received: %s', data);
//     });
  
//     ws.send('something'); // send to client
//   });