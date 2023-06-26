//----------------------Server INIT-----------------------
const express = require('express');
const webSocket = require('ws');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config({path:__dirname+"/config/.env"})
const app = express();
const server = http.createServer(app);
const session = require('express-session'); // saving users information on backstage

app.use(express.static(__dirname+'/views'));
app.use(express.json()); // to enable json communication format
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(session({
  secret: 'UserID',    
  saveUninitialized: false,
  resave: false
}))
const wsServer = new webSocket.Server({server:server}); // webSocket initialization with express server

// wsServer.on()

//----------------------DB INIT----------------------
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(
  process.env.MONGODB_URI,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName : process.env.DATA_BASE_NAME
  }
        )


//--------------------------- Server Actions------------------------------

app.use('/',require('./routes/CustomerRouting'))



server.listen(process.env.SERVER_PORT); // process.env."ENV.PROPERTY"

//--------------------------------Socket Actions------------------------------------
