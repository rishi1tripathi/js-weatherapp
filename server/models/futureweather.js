var mongoose =require('mongoose');
var FutureWeather =mongoose.model('futureweather',{
    day1:{
        type:Number,
        required :true,
        trim:true
    },
    day2 :{
        type:Number,
        required :true,
        trim:true
    },
    day3:{
        type:Number,
        required :true,
        trim:true
    },
    day4:{
        type:Number,
        required :true,
        trim:true
    },
    day5:{
        type:Number,
        required :true,
        trim:true
    },
    
    city:{
        type:String,
        required:true,
        

    }

});

module.exports={FutureWeather};