(function(){
let appId = "74e3eb76846212e4854eaafd1e725d82";
let temperatureUnit = "metric";
let searchMethod='q';
let x=32;
let favouriteArray=[];

const temperatureSwicthToggle = {
    flap : document.getElementById('flap'),
    toggle : document.querySelector('.toggle'),
    choice1 : document.getElementById('choice1'),
    choice2 : document.getElementById('choice2'),
};

let backgroundImage=document.body.style;
let weatherDescriptionHeader=document.getElementById('weatherDescriptionHeader');
let temperatureElement = document.getElementById('temperature');
let humidityElement=document.getElementById('humidity');
let windspeedElement=document.getElementById('windspeed');
let cityHeader=document.getElementById('cityHeader');
let weatherIcon =document.getElementById('documentIconImage');
let favourite :HTMLElement= document.getElementById("favourite");
let isFavouriteStatus=favourite.childNodes[0];
let resultDescription;
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let popupHeader = document.getElementById("popheader");
let popupBody=document.getElementById("popbody");
let futureWeatherContainerDiv=document.getElementsByClassName("futureWeatherContainer")[0];
let futureCityNameDiv = document.getElementsByClassName("futureCityName")[0];
let futureDetailsDiv = document.getElementsByClassName("futureDetails");
let futureDayDiv = document.getElementsByClassName("futureDay");
let futureTempDiv = document.getElementsByClassName("futureTemp");
let futureDisplayDiv = document.getElementById("openFuture");
let favouriteCityContainerDiv;
let favouriteCityNameDiv;
let favouriteCityTemperatureDiv;
let favouriteCityRemoveIconDiv;
let futureTemperature=[];
let futureWeatherDetails=[];
let namesOfDay = ["Sunday","Monday","TuesDay","Wednesday","ThursDay","Friday","Saturday"];
favouriteArray=JSON.parse(localStorage.getItem("favouriteList"));


Object.prototype.toggletemperatureMetrics=function (n,unit){
    console.log("bravo");
    if(unit==='C')
        return Math.round((n-32)/(9/5));
    if(unit==='F')
        return Math.round((n*9/5)+32);

    
}

//Event Object
let events={
    events:{},
    subscribe:function(eventName,functionHandler){
    this.events[eventName]=this.events[eventName]||[];
    this.events[eventName].push(functionHandler);
    },
    publish:function(eventName,value){
        if(this.events[eventName])
            this.events[eventName].forEach(handler=>handler(value));

    },
    unsubscribe:function(eventName,handler){
        let handlerList = this.events[eventName];
        if(handlerList){
            for(let i=0;i<handlerList.length;i++){
                if(handlerList[i]===handler){
                    handlerList.splice(i,1);
                    break;
                }
            }
        }

    }

}
if(favouriteArray != null)
    favouriteArray.forEach(element => {
        let temp = element.cityTemperature.slice(-1);
        if(temp ==='F'){
            temp = toggletemperatureMetrics(parseInt(element.cityTemperature),'C')
        }
        else{
            temp = parseInt(element.cityTemperature);
        }
        addCityToFavouriteList(element.cityName,temp,4)
    });
else
    favouriteArray=[];   

navigator.geolocation.getCurrentPosition(success,error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
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


// function searchWeather(searchTerm){
    
//     if(temperatureSwicthToggle.flap.children[0].innerHTML==='Celsius')
//     temperatureUnit="metric";
//     if(temperatureSwicthToggle.flap.children[0].innerHTML==='Fahrenheit')
//     temperatureUnit="imperial";
//     fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`).then(result=>{
//        return result.json();
//     }).then(result=>{
//         displayCurrentWeather(result);
//         setPositionResult();
        

//     }).catch(result=>{displapPopup("Error","Please Enter a valid city");})
//     fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`).then(result=>{
//        return result.json();
//     }).then(result=>{
//         console.log(result);
//         futureTemperature=result.list.filter((curr,index)=>index%8===0).map(result=>Math.trunc(result.main.temp));
//         console.log(futureTemperature);
//         processForecastedWeatherArray();
//         diplayForeCastedWeather();
       
        
    
        
        

//     }).catch(result=>{
        
//         if(result.name==="ReferenceError")
//             displapPopup("Error","Processing Weather Error");
//         else
//             displapPopup("Error","Please Enter a valid city");
//         })
    
// } 
async function searchWeather(searchTerm){
    try{
        if(temperatureSwicthToggle.flap.children[0].innerHTML==='Celsius')
        temperatureUnit="metric";
        if(temperatureSwicthToggle.flap.children[0].innerHTML==='Fahrenheit')
        temperatureUnit="imperial";
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`);
        console.log(response['status']);
        response = await response.json();
        displayCurrentWeather(response);
        setPositionResult();
        response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${temperatureUnit}`);
        response = await response.json();
        futureTemperature=response.list.filter((curr,index)=>index%8===0).map(response=>Math.trunc(response.main.temp));
        processForecastedWeatherArray();
        diplayForeCastedWeather();

    }
    catch(err){
        console.log(typeof err);
        debugger;
        if(err.name==="ReferenceError")
            displapPopup("Error","Processing Weather Error");
        else
            displapPopup("Error","Please Enter a valid city");

    }
}

function getCurrentDay(){
    let date = new Date();
    let month = date.getDay();
    return month;

}
function processForecastedWeatherArray(){
    futureWeatherDetails=[];
    let currentDay=getCurrentDay()+1;
    
    for(let i=0;i<5;i++){
    let currentDayName=namesOfDay[currentDay];
    futureWeatherDetails.push({dayName:currentDayName,temperature:futureTemperature[i]});
    currentDay=(++currentDay>6)?0:currentDay;
    }
    console.log(futureWeatherDetails);
}
function diplayForeCastedWeather(){
    console.log(futureDayDiv[0].innerHTML);
    console.log(futureTempDiv[0].innerHTML);
   // futureWeatherContainerDiv.style.visibility='visible';
    
    for(let i=0;i<5;i++){
        futureDayDiv[i].innerHTML = futureWeatherDetails[i].dayName;
        if(temperatureUnit==='metric')
            futureTempDiv[i].innerHTML = futureWeatherDetails[i].temperature +' \xB0C';
        else
            futureTempDiv[i].innerHTML = futureWeatherDetails[i].temperature +' \xB0F';
    }
    //futureWeatherContainerDiv.style.visibility='visible';
}



//events.subscribe('changeTemperatureUnit',changeForecastedWeatherUnits);
function displayCurrentWeather(resultFromServer){
    console.log(resultFromServer);
    
    console.log(resultFromServer.weather[0].main)
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
    dipalayMainDivTemp();
    events.subscribe('changeTemperatureUnit',dipalayMainDivTemp);
    
    function dipalayMainDivTemp(value){

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
function changeForecastedWeatherUnits(value){
    
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
function changeFavouriteWeatherUnits(value){
    let noOfFavourite=0;
    let allChild = document.body.children;
    for(let i=0;i<allChild['length'];i++){
        if(allChild[i].classList.contains("flex-container")){
            if(value.convertedTemperatureUnit==='C'){   
                let temp = Math.floor(toggletemperatureMetrics(parseInt(allChild[i].children[1].innerHTML),'C')) +' \xB0C';
                allChild[i].children[1].innerHTML = temp;
                favouriteArray[noOfFavourite].cityTemperature = temp;

            }
            else{
                let temp = Math.floor(toggletemperatureMetrics(parseInt(allChild[i].children[1].innerHTML),'F')) + ' \xB0F';
                allChild[i].children[1].innerHTML =  temp;
                favouriteArray[noOfFavourite].cityTemperature = temp;
            }
            noOfFavourite++;
        }
    }
    localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));

}




function toggleFavouriteIcon(){
    
    if(favouriteArray.some(value=>value.cityName===cityHeader.innerHTML)){
        isFavouriteStatus.innerHTML="remove_circle";
    }
    else{
        isFavouriteStatus.innerHTML="add_circle";
    }
}




function favouriteClicked(){
    
    if(favouriteArray.some(value=>value.cityName===cityHeader.innerHTML)){
        console.log("Already exist");
        isFavouriteStatus.innerHTML="remove_circle";
        deleteCityFromFavourite();
    }
    else{
        
        let cityName=cityHeader.innerHTML;
        let cityTemperature=parseInt(temperatureElement.innerHTML);
        
       
        if(favouriteArray.length<5){
            if(favouriteArray.findIndex(x=>x.cityName===cityName)===-1){
                addCityToFavouriteList(cityName,cityTemperature);
               // favouriteArray.push({cityName:cityName,cityTemperature:cityTemperature})
            }
        }
        else{
            displapPopup("Error","You can add only five elements");
        }
        localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
        isFavouriteStatus.innerHTML="remove_circle";
    }
}






function addCityToFavouriteList(cityName,cityTemperature){
       
    
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
        
        if(arguments.length===2)
            favouriteArray.push({cityName:cityName,cityTemperature:cityTemperature})
}

function deleteCityFromFavourite(event){
        if(event){
            let favouriteCity=event.target.parentElement.parentElement;
            let cityName=favouriteCity.children[0].innerHTML;
            console.log(favouriteCity);
            console.log(cityName);
            favouriteArray=favouriteArray.filter(element=>element.cityName!=cityName);
            console.log(favouriteArray);
            favouriteCity.parentElement.removeChild(favouriteCity);
            localStorage.setItem('favouriteList',JSON.stringify(favouriteArray));
        }
        else{
           let allChild = document.body.children;
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
    let searchTerm =document.getElementById('searchInput').value;
    if(searchTerm==='')
    displapPopup("Error","Please enter something to search");
    else
        searchWeather(searchTerm);
    
});
document.getElementById('searchInput').addEventListener('keyup',(event)=>{
    console.log("Inside keyup event");
    if(event.keyCode===13){
        let searchTerm =document.getElementById('searchInput').value;
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
    console.log(weatherContainerHeight+' '+ weatherContainerWidth);
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
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



temperatureSwicthToggle.flap.addEventListener('transitionend', () => {

    if (temperatureSwicthToggle.choice1.checked) {
        temperatureSwicthToggle.toggle.style.transform = 'rotateY(-15deg)';
        setTimeout(() => temperatureSwicthToggle.toggle.style.transform = '', 400);
    } else {
        temperatureSwicthToggle.toggle.style.transform = 'rotateY(15deg)';
        setTimeout(() => temperatureSwicthToggle.toggle.style.transform = '', 400);
    }

})

temperatureSwicthToggle.clickHandler = (e) => {

    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            if(temperatureSwicthToggle.flap.children[0].textContent!=e.target.textContent){
                
                temperatureSwicthToggle.flap.children[0].textContent = e.target.textContent;
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

document.addEventListener('DOMContentLoaded', () => {
    temperatureSwicthToggle.flap.children[0].textContent = temperatureSwicthToggle.choice2.previousElementSibling.textContent;
});

document.addEventListener('click', (e) => temperatureSwicthToggle.clickHandler(e));
favourite.addEventListener('click',favouriteClicked);


futureDisplayDiv.addEventListener('click',(e)=>{
    
    let visible=futureWeatherContainerDiv.style;
    let expnaderIconClass=futureDisplayDiv.childNodes[0].classList;
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


