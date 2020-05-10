var cacheKey = "knownCities";
var cityName = $("#city-name");
var cityTemp = $("#temp");
var cityHumid = $("#humid");
var cityWind = $("#wind");
var cityUv = $("#uv-index");
var currentDay = $("#currentDay");
var date = moment(new Date()).format(" (dddd, MMMM Do, YYYY)");
var fiveDayDate = moment().add(nextDay, 'days').format("M/D/YY");
var nextDay = 1;

//captures search query
$("#search-button").on("click", function () {
    var citySearch = $("#search-input").val();
    $("#search-input").val("");
    searchWeather(citySearch);
})

$("#search-input").on("keypress", function (e) {
    if (e.keyCode === 13) {
        var citySearch = $("#search-input").val();
        $("#search-input").val("");
        searchWeather(citySearch);
    }
})

//gets starting data from local storage, if there is any
var cities = JSON.parse(localStorage.getItem(cacheKey));

//creates new, empty object if there is no data in local storage
if (!cities) {
    cities = [];
}

//pushes search query through each ajax call
function searchWeather(city) {
    fetchWeather(city);
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
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        cityName.text(response.name).append(date);
        cityTemp.text(response.main.temp).append(cityTempF);
        cityHumid.text(response.main.humidity).append(cityHumidPercent);
        cityWind.text(response.wind.speed).append(cityWindSpeed);

        //get UV index and 5 day forecast using lat/lon coordinates from first ajax response
        var queryTwoUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&apikey=9fc203891252cc2336158c490f709da2&units=imperial";

        console.log(queryTwoUrl);

        $.ajax({
            url: queryTwoUrl,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            // var fiveDayTemp = $(".5-day-deg").text("°F");
            // var fiveDayPercent = $(".5-day-percent").text("%");
            for (let i = 0; i < 5; i++){
                function renderFiveDay(){
                    $("#5-day-temp-"+i).text(response.daily[i].temp.day);
                    $("#5-day-humid-"+i).text(response.daily[i].humidity);
                    $("#5-day-date-"+i).text(fiveDayDate);
                    parseInt(nextDay)+1;
                    console.log(nextDay);
                }
                renderFiveDay();
                cityUv.text(response.current.uvi);
            }
            if (response.current.uvi < 4){
                cityUv.css("background-color", "green");
            }else if(response.current.uvi > 7){
                cityUv.css("background-color", "red");
            }else{
                cityUv.css("background-color", "yellow");
            }
        });
    });
}

//adds city to local storage
function addNewCity(city) {
    if (cities.indexOf(city) === -1) {
        cities.push(city);
        localStorage.setItem(cacheKey, JSON.stringify(cities));
    }
}