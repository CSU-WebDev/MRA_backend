var express = require('express');
var app = express();
var axios = require('axios');
const cors=require('cors');

var key = "788aa04875544ccabbf41651231402";

//send json
 app.get('/', function(req, res){
    axios.get("http://api.weatherapi.com/v1/forecast.json?key="+key+"&q="+res.body.id).then(function(resp){
        console.log(resp.data);
        res.json(resp.data);
    })
    
})

// app.get('/', function(req, res){
//     axios.get("http://api.weatherapi.com/v1/forecast.json?key="+key+).then(function(resp){
        
//     })
    
// })

// app.get('/', function(req, res){
//     res.send('Hello World');
// })

//cors
const options = {

    "origin": "*",
    
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    
    "preflightContinue": true,
    
    "optionsSuccessStatus": 200
    
    }

app.use(cors(options))


app.listen(3000, function(){
    console.log('App listening on port 3000')
})