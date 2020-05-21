var cacheKey = "knownCities";
var cityName = $("#city-name");
var cityTemp = $("#temp");
var cityHumid = $("#humid");
var cityWind = $("#wind");
var cityUv = $("#uv-index");
var currentDay = $("#currentDay");
var date = moment().format(" (dddd, MMMM Do, YYYY)");

//captures search query
$("#search-button").on("click", function () {
  var citySearch = $("#search-input").val();
  $("#search-input").val("");
  searchWeather(citySearch);
});
$("#search-input").on("keypress", function (e) {
  if (e.keyCode === 13) {
    var citySearch = $("#search-input").val();
    $("#search-input").val("");
    searchWeather(citySearch);
  }
});

//gets starting data from local storage, if there is any
var cities = JSON.parse(localStorage.getItem(cacheKey));

//creates new, empty object if there is no data in local storage
if (!cities) {
  cities = [];
}

//adds searches to history
function renderCitiesButton(cities) {
  $("#cities-list").empty();
  for (let i = 0; i < cities.length; i++) {
    $("#city-" + [i]).text(cities[i]);
    var citiesListItem = $(
      '<li class="list-group-item"><button>' + cities[i] + "</button></li>"
    );
    citiesListItem.children().data("cityData", cities[i]);
    $("#cities-list").append(citiesListItem);
  }
}

//Adds click event to search history to pass it through search
$("#cities-list").on("click", "button", function () {
  var buttonSearch = $(this).data("cityData");
  fetchWeather(buttonSearch);
});

//pushes search query through each ajax call renders resutlts to HTML
function searchWeather(city) {
  fetchWeather(city);
  addNewCity(city);
}

//get weather from API
function fetchWeather(city) {
  var queryParams = $.param({
    q: city,
    appid: "9fc203891252cc2336158c490f709da2",
  });
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?" +
    queryParams +
    "&units=imperial";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
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
    var queryTwoUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&apikey=9fc203891252cc2336158c490f709da2&units=imperial";

    $.ajax({
      url: queryTwoUrl,
      method: "GET",
    }).then(function (response) {
      for (let i = 1; i < 6; i++) {
        function renderFiveDay() {
          $("#5-day-temp-" + i).text(response.daily[i].temp.day);
          $("#5-day-humid-" + i).text(response.daily[i].humidity);
          var fiveDayDate = moment.unix(response.daily[i].dt).format("M/D/YY");
          $("#5-day-date-" + i).text(fiveDayDate);
        }
        renderFiveDay();
        cityUv.text(response.current.uvi);
      }
      if (response.current.uvi < 4) {
        cityUv.css("background-color", "green");
      } else if (response.current.uvi > 7) {
        cityUv.css("background-color", "red");
      } else {
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
  renderCitiesButton(cities);
}

renderCitiesButton(cities);
