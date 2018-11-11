var express = require('express');
var bodyParser =require('body-parser');
var cors =require('cors');


var {mongoose}= require('./db/mongoose');
var {Todo}=require('./models/todo');
var {CurrentWeather} =require('./models/currentweather')
const {FutureWeather} = require('./models/futureweather')

var app =express();
app.use(cors());
app.use(bodyParser.json());

app.post('/currentWeather',(req, res) => { 
    var requestBody=req.body;
    var currentWeather =new CurrentWeather({
        city :requestBody.city,
        tempC: requestBody.tempC,
        tempF: requestBody.tempF,
        description :requestBody.description,
        humidity:requestBody.humidity,
        windSpeed:requestBody.windSpeed,
        main:requestBody.main
})
currentWeather.save().then((doc)=>{
    res.send(doc);

},(error)=>{
    res.status(400).send(error);
})
})

app.post('/futureweather',(req,res)=>{
    var requestBody=req.body;
    var futureWeather =new FutureWeather({
        city:requestBody.city,
        day1:requestBody.day1,
        day2:requestBody.day2,
        day3:requestBody.day3,
        day4:requestBody.day4,
        day5:requestBody.day5

    })
    futureWeather.save().then((doc)=>{
        res.send(doc);
    },(error)=>{
        res.status(400).send(error);
    }
    )

})

app.get('/currentWeather/:city',(req,res)=>{
    console.log(req.params.city);
    CurrentWeather.findOne({city:req.params.city}).then((weatherDetails)=>{
        if(!weatherDetails){
            return res.status(400).send();
        }
        res.send({weatherDetails});
    }).catch((e)=>{
        res.status(400).send();
    })
    
})
app.get('/futureweather/:city',(req,res)=>{
    console.log(req.params.city);
    FutureWeather.findOne({city:req.params.city}).then((weatherDetails)=>{
        if(!weatherDetails){
            return res.status(400).send();
        }
        res.send({weatherDetails});
    }).catch((e)=>{
        res.status(400).send();
    })
    
})



app.listen(3000,()=>{
    console.log("Started on port 3000");
})


module.exports={app};
