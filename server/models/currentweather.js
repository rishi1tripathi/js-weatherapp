var mongoose =require('mongoose');
var CurrentWeather =mongoose.model('currentweather',{
    city:{
        type:String,
        required:true,
        trim:true
    },
    tempC :{
        type:Number,
        required :true,
        trim:true
    },
    tempF:{
        type:Number,
        required :true,
        trim:true
    },
    description:{
        type:String,
        required:false,
        default:"Enjoy the weather",
        trim:true
    },
    humidity:{
        type:Number,
        required:false,
        default:0,
        trim:true
    },
    windSpeed:{
        type:Number,
        required:false,
        default:0
    },
    main:{
        type:String,
        required:false,
        default:"Default"

    }

});

module.exports={CurrentWeather};