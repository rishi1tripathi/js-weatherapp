let toggletemperatureMetrics=function (n,unit){
        console.log("bravo");
        if(unit==='C')
            return Math.round((n-32)/(9/5));
        if(unit==='F')
            return Math.round((n*9/5)+32);
    
        
}

export default toggletemperatureMetrics;