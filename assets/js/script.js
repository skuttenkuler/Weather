$(document).ready(function(){
    
   var currentDay = moment().format('dddd');
   var currentDate = moment().format('MMM Do YYYY');
   var cityArr = ["Nashville","San Francisco", "Houston" ];
   
    function pushList(){
        localStorage.setItem("cities", cityArr);
    }
    function getData(){
                //need  city date icon temp humidity wind speed uv index
        $(".currentWeatherContainer").empty()
        let city = $(this).attr("data-name");
        console.log(city);
        var WeatherAPIKey = "c16c4a8fdb9c60761ec51031deb88c71";
        var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + WeatherAPIKey;
        // var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&appid=" + WeatherAPIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            //console.log(response);
            currIconEl = $("<i>");
            var currIcon =  response.weather[0].main 
            
                    var currIconEl = $("<i>");
                        if(currIcon == "Rain"){
                            currIconEl.addClass("fas fa-cloud-showers-heavy")
                        }   else if(currIcon == "Clouds"){
                            currIconEl.addClass("fas fa-cloud")
                            }   else if(currIcon == "Clear"){
                                currIconEl.addClass("fas fa-sun")
                                }   else if(currIcon == "Snow"){
                                    currIconEl.addClass("fas fa-snowflake")
                                    }   else if(currIcon == "Snow"){
                                        currIconEl.addClass("fas fa-snowflake")
                                        }   else if(currIcon == "Drizzle"){
                                            currIconEl.addClass("fas fa-cloud-rain")
                                            }   else if(currIcon == "Thunderstorm"){
                                                currIconEl.addClass("fas fa-bolt")
                                                }
                                        
            //current weather city current date icon for current weather
            currentHeader = $("<h2>").text(response.name +":  "+ currentDay + "  " + "( " + currentDate + " )");
            //p tag for temperature
            let tempfloor = Math.floor(response.main.temp)
            currentTemp = $("<p>").text("Tempurature: " + tempfloor + "°");
            // humidity
            currentHum = $("<p>").text("Humidity: " + response.main.humidity+"%");
            //wind speed
            currentWind = $("<p>").text("Wind Speed: " + response.wind.speed + "mph");
            //uv index
            //currentUV = $("<p>").text("UV Index: " + uvIndex);
            $(".currentWeatherContainer").append(currentHeader, currIconEl, currentTemp, currentHum, currentWind,);
            getUV(response);
            getFiveDay(response);
        });
        
    }

    function addLocation(){
        let location = $("#location").val();
        
        
        for(var i = 0; i < cityArr.length; i++){
            if(cityArr.indexOf(location) === -1 && location != ''){
                cityArr.push(location);
                localStorage.setItem(JSON.stringify("cities",cityArr));
    

            }
        }
            var test = $(".display-cites");
            //console.log(test)
        $(".display-cities").empty();
        renderLocations();
    }
    
    function renderLocations(){
       
        $(".display-cites").empty();
            var cities = localStorage.getItem("cities");
            var cityList = cities.split(",")
            for(var i =0; i < cityList.length; i++){
                //create a div to contain
                locationContainer = $("<div>");
                //create a button tag to store cityArr[i]
                locationButton = $("<button>").text(cityList[i]);
                //add class button
                locationButton.addClass("button");
                //add data attr data-name 
                locationButton.attr("data-name", cityList[i]);
                locationContainer.append(locationButton);
                
                $(".display-cities").append(locationContainer);
            }
                
    }
    
    function getUV(response){
        console.log(response)
        var WeatherAPIKey = "c16c4a8fdb9c60761ec51031deb88c71";
        $.ajax({url:"http://api.openweathermap.org/data/2.5/uvi?appid="+ WeatherAPIKey +"&lat="+ response.coord.lat +"&lon="+ response.coord.lon,
                method: "GET"
            }).then(function(uv){
                 var uvIndex = uv.value;
                 currentUV = $("<p>").text("UV Index: " + uvIndex);
                 //if UV < 2 green
                 if(uvIndex <= 2){
                     currentUV.attr("style","background-color: green;  color:white; width:140px; border-radius:5px");
                     //if UV > 3 \\ <=7 orange
                 }  else if (uvIndex >= 3 && uvIndex <= 7){
                    currentUV.attr("style","background-color: yellow; width:140px; border-radius:5px");
                        //if UV >=8 or <= 10 red
                    }   else if (uvIndex >= 8 && uvIndex <= 10){
                        currentUV.attr("style","background-color: red; color:white; width:140px; border-radius:5px");
                        }   else if(uvIndex >= 11){
                            currentUV.attr("style","background-color: purple; color:white; width:140px; border-radius:5px");
                            }
                 //if UV >= 11 purple
                 $(".currentWeatherContainer").append(currentUV)
                });
    }
    function getFiveDay(data){
        $(".five-day").empty()
        var header = $("<h1>").text("Five Day Forcast");
        $(".fiveHeader").append(header)
        var name = data.name
        //console.log(name)
        var WeatherAPIKey = "c16c4a8fdb9c60761ec51031deb88c71";
        $.ajax({url:"http://api.openweathermap.org/data/2.5/forecast?appid=" + WeatherAPIKey + "&q="+ name + "&cnt=5",
                method: "GET"
            }).then(function(fiveday){
                //console.log(fiveday.list)
                for(var i = 0; i < fiveday.list.length; i ++){
                    var fiveDayContainer = $("<div>");
                    fiveDayContainer.addClass("five-day-card")
                    var fivedayTemp = fiveday.list[i].main.temp;
                    var fivedayHum = fiveday.list[i].main.humidity + "% ";
                    var icon = fiveday.list[i].weather[0].main
                    var iconEl = $("<i>");
                        if(icon == "Rain"){
                            iconEl.addClass("fas fa-cloud-showers-heavy")
                        }   else if(icon == "Clouds"){
                            iconEl.addClass("fas fa-cloud")
                            }   else if(icon == "Clear"){
                                iconEl.addClass("fas fa-sun")
                                }   else if(icon == "Snow"){
                                    iconEl.addClass("fas fa-snowflake")
                                    }   else if(icon == "Snow"){
                                        iconEl.addClass("fas fa-snowflake")
                                        }   else if(icon == "Drizzle"){
                                            iconEl.addClass("fas fa-cloud-rain")
                                            }   else if(icon == "Thunderstorm"){
                                                iconEl.addClass("fas fa-bolt")
                                                }
                                        
                                
                    //console.log(icon)
                    var valNum = parseFloat(fivedayTemp);
                    //convert K degrees to Fahrenhiet
                    var tempF = Math.floor(((valNum - 273.15)*1.8) + 32);
                    var tempEl = $("<p>").text("Temp: " +tempF + "°");
                    var humEl = $("<p>").text("Humidity: " + fivedayHum);
                    //console.log(tempF)
                    fiveDayContainer.append(iconEl,tempEl, humEl);
                    $(".five-day").append(fiveDayContainer);
                    

                    
                }
            
                
                });
           
    }
    
    
    $(document).on("click", ".button", getData);
    $(".submit").on("click", addLocation);
    pushList();
    renderLocations();

});