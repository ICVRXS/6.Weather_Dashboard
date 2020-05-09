console.log("start weather app");

var cacheKey = "knownCities";
var cityName = $("#city-name");
var cityTemp = $("#temp");
var cityHumid = $("#humid");
var cityWind = $("#wind");
var cityUv = $("#uv-index");

//captures search query
$("#search-button").on("click", function(){
    var citySearch = $("#search-input").val();
    $("#search-input").val("");
    searchWeather(citySearch);
})

$("#search-input").on("keypress", function(e) {
    if (e.keyCode === 13){
        var citySearch = $("#search-input").val();
        $("#search-input").val("");
        searchWeather(citySearch);
    }
})

//gets starting data from local storage, if there is any
var cities = JSON.parse(localStorage.getItem(cacheKey));

//creates new, empty object if there is no data in local storage
if (!cities){
    cities = [];
}

//pushes search query through each ajax call
function searchWeather(city){
    fetchWeather(city);
    fetchUV(city);
    fetchForecast(city);
    addNewCity(city);
}

//get weather from API
function fetchWeather(city) {
    var queryParams = $.param({
        q: city,
        appid: "9fc203891252cc2336158c490f709da2"
    });
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?" + queryParams + "&units=imperial";

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var cityTempF = $("#deg").text("°F");
        var cityHumidPercent = $("#percent").text("%");
        var cityWindSpeed = $("#mph").text("mph");

        cityName.text(response.name);
        cityTemp.text(response.main.temp).append(cityTempF);
        cityHumid.text(response.main.humidity).append(cityHumidPercent);
        cityWind.text(response.wind.speed).append(cityWindSpeed);
    });
}

//get UV index from API
function fetchUV(latitude, longitude) {
    var queryParams = $.param({
        q: "lat=" + latitude + "&lon=" + longitude,
        appid: "9fc203891252cc2336158c490f709da2"
    });
    var queryUrl = "http://api.openweathermap.org/data/2.5/uvi?" + queryParams + "&units=imperial";

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
}

//render UV index to HTML
function displayUV(cityData) {
    
}

//get 5 day forecast from API
function fetchForecast(city) {
    var queryParams = $.param({
        q: city,
        appid: "9fc203891252cc2336158c490f709da2"
    });
    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?" + queryParams + "&units=imperial";

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
}

//render 5 day forecast to HTML
function displayForecast(cityData) {
    
}

//adds city to local storage
function addNewCity(city){
    if (cities.indexOf(city) === -1){
        cities.push(city);
        localStorage.setItem(cacheKey, JSON.stringify(cities));
    }
}