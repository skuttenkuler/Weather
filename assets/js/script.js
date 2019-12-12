$(document).ready(function(){
    
   var currentDay = moment().format('dddd');
   var currentDate = moment().format('MMM Do YY');
    
    function getData(){
                //need  city date icon temp humidity wind speed uv index

        //let city = $(this).val("data-name");
        //console.log(city);
        var WeatherAPIKey = "c16c4a8fdb9c60761ec51031deb88c71";
        //var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + WeatherAPIKey;
        var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&appid=" + WeatherAPIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            
            //current weather city current date icon for current weather
            currentHeader = $("<h2>").text(response.name +"  "+ currentDay + "  " + "( " + currentDate + " )");
            //p tag for temperature
            currentTemp = $("<p>").text("Tempurature: " + response.main.temp);
            // humidity
            currentHum = $("<p>").text("Humidity: " + response.main.humidity);
            //wind speed
            currentWind = $("<p>").text("Wind Speed: " + response.wind.speed);
            //uv index
            //currentUV = $("<p>").text("UV Index: " + uvIndex);
            $(".currentWeatherContainer").append(currentHeader, currentTemp, currentHum, currentWind,);
        });
        
    }
    
    function renderLocations(){
        $(".display-cites").empty();
        let location = $("#location").val();
        var cityArr = ["Nashville","San Francisco", "Houtson" ];
        
        for(var i = 0; i < cityArr.length; i++){
            if(location !== cityArr[i]){
                cityArr.push(location);
            }
            
            //create a div to contain
            locationContainer = $("<div>");
            //create a button tag to store cityArr[i]
            locationButton = $("<button>").text(cityArr[i]);
            //add class button
            locationButton.addClass("button");
            //add data attr data-name 
            locationButton.attr("data-name", cityArr[i]);
            locationContainer.append(locationButton);
            
            $(".display-cities").prepend(locationContainer);
           
        }
    }
    
    function GetUV(){
        $.ajax({url:"http://api.openweathermap.org/data/2.5/uvi?appid="+ WeatherAPIKey +"&lat="+ response.coord.lat +"&lon="+ response.coord.lon,
                method: "GET"
            }).then(function(uv){
                 var uvIndex = uv.value;});
    }
    
    $(document).on("click", ".button", getData);
    $(".submit").on("click", renderLocations);

});