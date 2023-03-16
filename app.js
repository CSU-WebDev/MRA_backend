var express = require('express');
var app = express();
var axios = require('axios');
const cors=require('cors');

const options = {

    "origin": "*",
    
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    
    "preflightContinue": true,
    
    "optionsSuccessStatus": 200
    
    }
app.use(express.json())
app.use(cors(options))

var key = "788aa04875544ccabbf41651231402";

//send json
 app.get('/', function(req, res){
    var temp = req.query && req.query.zip ? req.query.zip : "32926";
    axios.get("http://api.weatherapi.com/v1/forecast.json?key="+key+"&q="+temp).then(function(resp){
        //console.log(resp.data);
        let weather_data = resp.data;
        let hour_objects = []

        let arrayHours = weather_data.forecast.forecastday[0].hour
        for(let i = 0; i < arrayHours.length;i++){
            var x = {
                time : arrayHours[i].time,
                tempF : arrayHours[i].temp_f,
                wind : arrayHours[i].wind_mph,
                precip : arrayHours[i].precip_in,
                humidity : arrayHours[i].humidity
            }

            hour_objects.push(x);
        }

        let forecast = {
            location: weather_data.location.name+", "+weather_data.location.region,
            hours: hour_objects
        }
        console.log(arrayHours);
        res.json(forecast);
    })
    //catch error
    .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
})

//cors
app.use(cors(options))


app.listen(4000, function(){
    console.log('App listening on port 4000')
})