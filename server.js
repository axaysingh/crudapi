var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
const config = require('./app/config');
var mongoose = require('mongoose');

const app = express();

//body parser request
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//default route
app.get('/',(req,res) =>{
    res.json({"message":"Test api called!"});
})

//Mongodb conncet code
require('./app/users.routes.js')(app); 
mongoose.Promise = global.Promise;

mongoose.connect(config.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Successfully conected to database!');
}).catch(err =>{
    console.log('Fail to connect the database!');
    process.exit();
})

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//listen on port
app.listen(config.serverport,()=>{
    console.log("Server started on port! " +config.serverport);    
})