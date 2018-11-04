import toggletemperatureMetrics from './UnitConverterTemp';
import events from './events';
import {TemperatureSwitchToggleStructure} from './toggleSwitch'
(function(){
    
    let appId :string  = "74e3eb76846212e4854eaafd1e725d82";
    let temperatureUnit :string = "metric";
    let searchMethod :string='q';
    
    class TemperatureSwitchToggleImplementaion extends TemperatureSwitchToggleStructure{
        static clickHandler =(e) => {
    
            if (e.target.tagName === 'LABEL') {
                setTimeout(() => {
                    if(TemperatureSwitchToggleImplementaion.flap.children[0].textContent!=e.target.textContent){
                        
                        TemperatureSwitchToggleImplementaion.flap.children[0].textContent = e.target.textContent;
                        let convertedTemperature;
        
                        if(e.target.textContent=='Celsius'){
                            temperatureUnit='metric';
                            convertedTemperature=toggletemperatureMetrics(parseInt(temperatureElement.innerHTML),'C');
                            events.publish('changeTemperatureUnit',{'convertedTemperature':convertedTemperature,'convertedTemperatureUnit':'C'})
                            //temperatureElement.innerHTML=toggletemperatureMetrics(parseInt(temperatureElement.innerHTML),'C');
                        }
                           
                        if(e.target.textContent=='Fahrenheit'){
                            temperatureUnit='imperial';
                            convertedTemperature=toggletemperatureMetrics(parseInt(temperatureElement.innerHTML),'F');
                          events.publish('changeTemperatureUnit',{'convertedTemperature':convertedTemperature,'convertedTemperatureUnit':'F'})
                            //temperatureElement.innerHTML=toggletemperatureMetrics(parseInt(temperatureElement.innerHTML),'F');
                        }
                           
                    }
        
                }, 250);
            }
        }
    }
    
    interface FutureWeatherDetails{
        dayName:string,
        temperature:number
    }

    interface FavouriteModel{
        cityName:string,
        cityTemperature:string
    }
    interface ConvertedTemperature{
        convertedTemperature:number;
        convertedTemperatureUnit:string;

    }
    interface FavouriteModelList extends Array<FavouriteModel>{};

    let backgroundImage :CSSStyleDeclaration =document.body.style;
    let weatherDescriptionHeader : HTMLElement=document.getElementById('weatherDescriptionHeader');
    let temperatureElement :HTMLElement= document.getElementById('temperature');
    let humidityElement:HTMLElement=document.getElementById('humidity');
    let windspeedElement:HTMLElement=document.getElementById('windspeed');
    let cityHeader:HTMLElement=document.getElementById('cityHeader');
    let weatherIcon:HTMLImageElement = <HTMLImageElement>document.getElementById('documentIconImage');
    let favourite:HTMLElement = document.getElementById("favourite");
    let isFavouriteStatus= <HTMLElement> favourite.childNodes[0];
    let resultDescription;
    let modal:HTMLElement = document.getElementById('myModal');
    let span =  <HTMLElement>document.getElementsByClassName("close")[0];
    let popupHeader :HTMLElement = document.getElementById("popheader");
    let popupBody:HTMLElement=document.getElementById("popbody");
    let futureWeatherContainerDiv:HTMLElement=<HTMLElement>(document.getElementsByClassName("futureWeatherContainer")[0]);
    let futureCityNameDiv:HTMLElement=<HTMLElement>( document.getElementsByClassName("futureCityName")[0]);
    let futureDetailsDiv = document.getElementsByClassName("futureDetails");
    let futureDayDiv = document.getElementsByClassName("futureDay");
    let futureTempDiv = document.getElementsByClassName("futureTemp");
    let futureDisplayDiv :HTMLElement= document.getElementById("openFuture");
    let favouriteCityContainerDiv:HTMLElement;
    let favouriteCityNameDiv:HTMLElement;
    let favouriteCityTemperatureDiv:HTMLElement;
    let favouriteCityRemoveIconDiv:HTMLElement;
    let futureTemperature:Array<number>=[];
    let futureWeatherDetails:Array<FutureWeatherDetails>=[];
    let namesOfDay :Array<string>= ["Sunday","Monday","TuesDay","Wednesday","ThursDay","Friday","Saturday"];
    let favouriteArray :FavouriteModelList=JSON.parse(localStorage.getItem("favouriteList"));
    
    
    
    if(favouriteArray != null)
        favouriteArray.forEach(element => {
            let temp :string= element.cityTemperature.slice(-1);
            let temperature:number;
            if(temp ==='F'){
                temperature = toggletemperatureMetrics(parseInt(element.cityTemperature),'C')
            }
            else{
                temperature = parseInt(element.cityTemperature);
            }
            addCityToFavouriteList(element.cityName,temperature,0);
        });
    else
        favouriteArray=[];   
    
    navigator.geolocation.getCurrentPosition(success,error);
    
      function success(position:any):void {
        let latitude :number = position.coords.latitude;
        let longitude:number = position.coords.longitude;
        Promise.all( [fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appId}&units=${temperatureUnit}`).then( result=>result.json() ),  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${appId}&units=${temperatureUnit}`).then( result => result.json())] )
        .then((result)=>result.forEach( (currentValue, index)=>{
         if(index===0){
            displayCurrentWeather(currentValue);
            setPositionResult();
         }
         else{
            futureTemperature=currentValue.list.filter((curr,index)=>index%8===0).map(currentValue=>Math.trunc(currentValue.main.temp));
            processForecastedWeatherArray();
            diplayForeCastedWeather();
         }
        }))}
    
        //Using normal Promises
    
    
        // fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appId}&units=${temperatureUnit}`).then(result=>{
        //     return result.json();
        // }).then(result=>{
        //     displayCurrentWeather(result);
        //     setPositionResult();
            
        //  })
        //  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${appId}&units=${temperatureUnit}`).then(result=>{
        //     return result.json();
        //  }).then(result=>{
        //      console.log(result);
        //      futureTemperature=result.list.filter((curr,index)=>index%8===0).map(result=>Math.trunc(result.main.temp));
        //      console.log(futureTemperature);
        //      processForecastedWeatherArray();
        //      diplayForeCastedWeather();
            
             
         
             
             
     
        //  }).catch(result=>{
             
        //      if(result.name==="ReferenceError")
        //          displapPopup("Error","Processing Weather Error");
        //      else
        //          displapPopup("Error","Please Enter a valid city");
        //      })
    
       
    
      
      function error(err) {
        displapPopup("Warning","Please Enable Geo Location Permissions");
      }

    async function searchWeather(searchTerm:string){
        try{
            if(TemperatureSwitchToggleImplementaion.flap.children[0].innerHTML==='Celsius')
                temperatureUnit="metric";
            if(TemperatureSwitchToggleImplementaion.flap.children[0].innerHTML==='Fahrenheit')
                temperatureUnit="imperial";
            let response:Response = await fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`);
            response = await response.json();
            displayCurrentWeather(response);
            setPositionResult();
            response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`);
            response = await response.json();
            futureTemperature=response['list'].filter((curr,index)=>index%8===0).map(response=>Math.trunc(response.main.temp));
            processForecastedWeatherArray();
            diplayForeCastedWeather();
        }
        catch(err){
            console.log(typeof err);
            if(err.name==="ReferenceError")
                displapPopup("Error","Processing Weather Error");
            else
                displapPopup("Error","Please Enter a valid city");
    
        }
    }
    
    function getCurrentDay():number{
        let date :Date= new Date();
        let month:number = date.getDay();
        return month;
    
    }




    function processForecastedWeatherArray():void{
        futureWeatherDetails=[];
        let currentDay :number=getCurrentDay()+1;
        for(let i=0;i<5;i++){
            let currentDayName:string =namesOfDay[currentDay];
            futureWeatherDetails.push({dayName:currentDayName,temperature:futureTemperature[i]});
            currentDay=(++currentDay>6)?0:currentDay;
        }
        
    }



    function diplayForeCastedWeather():void{

        for(let i=0;i<5;i++){
            futureDayDiv[i].innerHTML = futureWeatherDetails[i].dayName;
            if(temperatureUnit==='metric')
                futureTempDiv[i].innerHTML = futureWeatherDetails[i].temperature +' \xB0C';
            else
                futureTempDiv[i].innerHTML = futureWeatherDetails[i].temperature +' \xB0F';
        }
       
    }
    
    
    
    
    function displayCurrentWeather(resultFromServer):void{
        
switch(resultFromServer.weather[0].main){
            case 'Clear':
            backgroundImage.backgroundImage='url("clear.jpg")';
                break;
            case 'Clouds':
            backgroundImage.backgroundImage='url("cloudy.jpg")';
                break;
            case 'Rain':
            case 'Drizzle':
            case 'Mist':
            backgroundImage.backgroundImage='url("rain.jpg")';
            break;
            case 'Thunderstorm':
            backgroundImage.backgroundImage='url("storm.jpg")';
            break;
            case 'Snow':
            backgroundImage.backgroundImage='url("snow.jpg")';
                break;
            default:
            backgroundImage.backgroundImage='url("default.jpg")';
            break;
        }
        
        weatherIcon.src='http://openweathermap.org/img/w/'+resultFromServer.weather[0].icon+'.png';
        resultDescription=resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
        dipalayMainDivTemp(undefined);
        events.subscribe('changeTemperatureUnit',dipalayMainDivTemp);
        
        function dipalayMainDivTemp(value:ConvertedTemperature):void{
    
            if(value){
                if(value.convertedTemperatureUnit==='C')
                    temperatureElement.innerHTML=Math.floor(value.convertedTemperature)+' \xB0C';
                if(value.convertedTemperatureUnit==='F')
                    temperatureElement.innerHTML=Math.floor(value.convertedTemperature)+' \xB0F';
            }
            else{
                if(temperatureUnit==='metric'){
                    temperatureElement.innerHTML=Math.floor(resultFromServer.main.temp)+' \xB0C';
                    //events.publish('changeTemperatureUnit',{'convertedTemperature':Math.floor(resultFromServer.main.temp),'convertedTemperatureUnit':'C'})
                }
                if(temperatureUnit==='imperial'){
                    temperatureElement.innerHTML=Math.floor(resultFromServer.main.temp)+' \xB0F';
                    //events.publish('changeTemperatureUnit',{'convertedTemperature':Math.floor(resultFromServer.main.temp),'convertedTemperatureUnit':'F'})
                }
            }
        }
        windspeedElement.innerHTML='Winds at ' +Math.floor(resultFromServer.wind.speed)+' m/s';
        cityHeader.innerHTML=resultFromServer.name;
        humidityElement.innerHTML='Humidity level at '+ resultFromServer.main.humidity +'%';
        toggleFavouriteIcon();
        
    }
    
    
    
    events.subscribe('changeTemperatureUnit',changeForecastedWeatherUnits);


    function changeForecastedWeatherUnits(value:ConvertedTemperature){
        
        if(value.convertedTemperatureUnit==='C'){
            for(let i=0;i<5;i++){
                futureWeatherDetails[i].temperature = toggletemperatureMetrics(futureWeatherDetails[i].temperature,'C');
              
                futureTempDiv[i].innerHTML = Math.floor(futureWeatherDetails[i].temperature)+' \xB0C';
            }
        }
        else{
            for(let i=0;i<5;i++){
                futureWeatherDetails[i].temperature = toggletemperatureMetrics(futureWeatherDetails[i].temperature,'F');
               
                futureTempDiv[i].innerHTML = Math.floor(futureWeatherDetails[i].temperature)+' \xB0F';
            }
        }
    
    }
    
    
    
    events.subscribe('changeTemperatureUnit',changeFavouriteWeatherUnits);
    function changeFavouriteWeatherUnits(value:ConvertedTemperature):void {
        let noOfFavourite :number=0;
        let allChild : HTMLCollection= document.body.children;
        for(let i=0;i<allChild['length'];i++){
            if(allChild[i].classList.contains("flex-container")){
                if(value.convertedTemperatureUnit==='C'){   
                    let temp:string = Math.floor(toggletemperatureMetrics(parseInt(allChild[i].children[1].innerHTML),'C')) +' \xB0C';
                    allChild[i].children[1].innerHTML = temp;
                    favouriteArray[noOfFavourite].cityTemperature = temp;
    
                }
                else{
                    let temp :string= Math.floor(toggletemperatureMetrics(parseInt(allChild[i].children[1].innerHTML),'F')) + ' \xB0F';
                    allChild[i].children[1].innerHTML =  temp;
                    favouriteArray[noOfFavourite].cityTemperature = temp;
                }
                noOfFavourite++;
            }
        }
        localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
    
    }
    
    
    
    
    function toggleFavouriteIcon():void{
        
        if(favouriteArray.some(value=>value.cityName===cityHeader.innerHTML)){
            isFavouriteStatus.innerHTML="remove_circle";
        }
        else{
            isFavouriteStatus.innerHTML="add_circle";
        }
    }
    
    
    
    
    function favouriteClicked():void{
        
        if(favouriteArray.some(value=>value.cityName===cityHeader.innerHTML)){
            isFavouriteStatus.innerHTML="remove_circle";
            deleteCityFromFavourite(undefined);
        }
        else{
            
            let cityName=cityHeader.innerHTML;
            let cityTemperature=parseInt(temperatureElement.innerHTML);
            
           
            if(favouriteArray.length<5){
                if(favouriteArray.findIndex(x=>x.cityName===cityName)===-1){
                    addCityToFavouriteList(cityName,cityTemperature,1);
                  
                }
            }
            else{
                displapPopup("Error","You can add only five elements");
            }
            localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
            isFavouriteStatus.innerHTML="remove_circle";
        }
    }
    
    
    
    
    
    
    function addCityToFavouriteList(cityName:string,cityTemperature,call:number):void {
           
        
            favouriteCityContainerDiv=document.createElement('div');
            favouriteCityNameDiv=document.createElement('div');
            favouriteCityTemperatureDiv=document.createElement('div');
            favouriteCityRemoveIconDiv=document.createElement('div');
            favouriteCityContainerDiv.className='flex-container';
            favouriteCityRemoveIconDiv.innerHTML = '<i class="material-icons">remove_circle_outline</i>';
            favouriteCityRemoveIconDiv.className='deleteIcon';
            favouriteCityNameDiv.innerHTML=cityName;
            
            if(temperatureUnit==='metric'){
                
                favouriteCityTemperatureDiv.innerHTML=cityTemperature +' \xB0C';
                cityTemperature=favouriteCityTemperatureDiv.innerHTML;
            }
            if(temperatureUnit==='imperial'){
                favouriteCityTemperatureDiv.innerHTML=cityTemperature  +' \xB0F';
                cityTemperature=favouriteCityTemperatureDiv.innerHTML;
            }
            favouriteCityTemperatureDiv.style.marginTop="5px";
            favouriteCityContainerDiv.appendChild(favouriteCityNameDiv);
            favouriteCityContainerDiv.appendChild(favouriteCityTemperatureDiv);
            favouriteCityContainerDiv.appendChild(favouriteCityRemoveIconDiv);
            document.body.insertBefore(favouriteCityContainerDiv,undefined);
            favouriteCityRemoveIconDiv.addEventListener('click',deleteCityFromFavourite);
            
            if(call!==0)
                favouriteArray.push({cityName:cityName,cityTemperature:cityTemperature})
    }

    
    function deleteCityFromFavourite(event:any):void{

            if(event){
                let favouriteCity:HTMLElement=event.target.parentElement.parentElement;
                let cityName:string=favouriteCity.children[0].innerHTML;
                favouriteArray=favouriteArray.filter(element=>element.cityName!=cityName);
                favouriteCity.parentElement.removeChild(favouriteCity);
                localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
            }
            else{
               let allChild :HTMLCollection= document.body.children;
               for(let i=0;i<allChild.length;i++){
                    if(allChild[i].classList.contains("flex-container")&&   (allChild[i].children[0].innerHTML===cityHeader.innerHTML)){
                       console.log(allChild[i]);
                       favouriteArray=favouriteArray.filter(element=>element.cityName!=cityHeader.innerHTML);
                       localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
                       allChild[i].remove();
                    }
                }
            }
            isFavouriteStatus.innerHTML="add_circle";
    
        
    }
    
    
    document.getElementById('searchBtn').addEventListener('click',()=>{
        let searchTerm = (<HTMLInputElement> document.getElementById('searchInput')).value;
        if(searchTerm==='')
        displapPopup("Error","Please enter something to search");
        else
            searchWeather(searchTerm);
        
    });
    document.getElementById('searchInput').addEventListener('keyup',(event)=>{
        console.log("Inside keyup event");
        if(event.keyCode===13){
            let searchTerm = (<HTMLInputElement>document.getElementById('searchInput')).value;
            if(searchTerm==='')
            displapPopup("Error","Please enter something to search");
            else
                searchWeather(searchTerm);
        }
    });
    
    function setPositionResult(){
        
        let weatherContainer =document.getElementById('weatherContainer');
        let weatherContainerHeight=weatherContainer.clientHeight;
        let weatherContainerWidth=weatherContainer.clientWidth;
        weatherContainer.style.left=`calc(50%-${weatherContainerWidth/2}px)`;
        weatherContainer.style.top=`calc(50%-${weatherContainerHeight/2}px)`;
        weatherContainer.style.visibility='visible';
    }
    function displapPopup(header,body){
        popupBody.innerHTML=body;
        popupHeader.innerHTML=header;
        modal.style.display = "block";
    
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event:any) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
    
    TemperatureSwitchToggleImplementaion.flap.addEventListener('transitionend', () => {
    
        if ( ( <HTMLInputElement>TemperatureSwitchToggleImplementaion.choice1).checked) {
            (<HTMLElement>TemperatureSwitchToggleImplementaion.toggle).style.transform = 'rotateY(-15deg)';
            setTimeout(() => (<HTMLElement>TemperatureSwitchToggleImplementaion.toggle).style.transform = '', 400);
        } else {
            (<HTMLElement>TemperatureSwitchToggleImplementaion.toggle).style.transform = 'rotateY(15deg)';
            setTimeout(() => (<HTMLElement>TemperatureSwitchToggleImplementaion.toggle).style.transform = '', 400);
        }
    
    })
    
    
    
    document.addEventListener('DOMContentLoaded', () => {
        TemperatureSwitchToggleImplementaion.flap.children[0].textContent = TemperatureSwitchToggleImplementaion.choice2.previousElementSibling.textContent;
    });
    
    document.addEventListener('click', (e) => TemperatureSwitchToggleImplementaion.clickHandler(e));
    favourite.addEventListener('click',favouriteClicked);
    
    
    futureDisplayDiv.addEventListener('click',(e)=>{
        
        let visible:CSSStyleDeclaration=(<HTMLElement>futureWeatherContainerDiv).style;
        let expnaderIconClass= (<HTMLElement>futureDisplayDiv.childNodes[0]).classList;
        if(visible.visibility==='visible'){
            visible.visibility = 'hidden';
            expnaderIconClass.remove("fa-angle-double-left");
            expnaderIconClass.add("fa-angle-double-right");
        }
        else{
            visible.visibility='visible';
            expnaderIconClass.remove("fa-angle-double-right");
            expnaderIconClass.add("fa-angle-double-left");
        }
        
        }
            );
    })();
    
    
    