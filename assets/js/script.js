

$(document).ready(function(){

    let location = $("#location").val();
    var WeatherAPIKey = "c16c4a8fdb9c60761ec51031deb88c71";
    var queryURL ="http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + WeatherAPIKey;
    console.log(location);
    //console.log(city);
    function getData(){
        
        console.log(location)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
        });
    }
    $(".submit").on("click", getData);
});