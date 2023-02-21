var express = require('express');
var app = express();
var axios = require('axios');

var key = "788aa04875544ccabbf41651231402";

//get forecast for Orlando
app.get('/', function(req, res){
    axios.get("http://api.weatherapi.com/v1/forecast.json?key="+key+"&q=Orlando&days=2").then(function(res){
        // //outputs Orlandos current temp in F
        // console.log("Orlando current temp: "+res.data.current.temp_f);
        // //Outputs the today and tomorrows forecast max tempeture in F
        // console.log(res.data.forecast.forecastday[0].day.maxtemp_f);
        // console.log(res.data.forecast.forecastday[1].day.maxtemp_f);
        console.log(res.data)
        return res.data;
        
    })
})

// app.get('/', function(req, res){
//     res.send('Hello World');
// })



app.listen(3000, function(){
    console.log('App listening on port 3000')
})