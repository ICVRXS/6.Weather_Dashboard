console.log("start weather app");

var cacheKey = "knownCities";

$("#search-button").on("click", function(){
    var citySearch = $("#search-input").val();
    $("#search-input").val("");
    searchWeather(citySearch);
    console.log(cities);
})

$("#search-input").on("keypress", function(e) {
    if (e.keyCode === 13){
        var citySearch = $("#search-input").val();
        $("#search-input").val("");
        searchWeather(citySearch);
        console.log(cities);
    }
})


//gets starting data from local storage, if there is any
var cities = JSON.parse(localStorage.getItem(cacheKey));

//creates new, empty object if there is no data in local storage
if (!cities){
    cities = [];
}

//captures search input on page
function searchWeather(city){
    fetchWeather(city);
    addNewCity(city);
}

//get weather from API
function fetchWeather(city) {
    var queryParams = $.param({
        q: city,
        appid: "9fc203891252cc2336158c490f709da2"
    });
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?" + queryParams;

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
}

//render weather to HTML
function displayWeather(cityData) {
    
}

//get UV index from API
function fetchUV(city) {
    
}

//render UV index to HTML
function displayUV(cityData) {
    
}

//get 5 day forecast from API
function fetchForecast(city) {
    
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