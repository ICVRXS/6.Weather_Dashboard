var citiesStore = JSON.parse(localStorage.getItem("weatherByCity"));

$("#search-button").on("click", function(){
    var citySearch = $("#search-input").val();
    $("#search-input").val("");
    renderCityData(citySearch);
})

$("#search-input").on("keypress", function(e) {
    if (e.keyCode === 13){
        var citySearch = $("#search-input").val();
        $("#search-input").val("");
        renderCityData(citySearch);
    }
})

if (!citiesStore) {
    citiesStore = {};
}

function renderCityData(cityName) {
    console.log(cityName);
    var cityData = getCityData(cityName);
    if (!cityData) {
        console.log("no data in local storage");
        return;
    }
    console.log("got data from local storage");
    var renderCityName = $("<h1>" + cityData.name + "</h1>");
    $(".city-name").append(renderCityName);
}

function getCityData(cityName) {
    if (citiesStore[cityName]) {
        return citiesStore[cityName];
    } else {
        fetchCityData(cityName);
        return false;
    }
}

function fetchCityData(cityName) {
    var queryParams = $.param({
        q: cityName,
        appid: "9fc203891252cc2336158c490f709da2"
    });
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?" + queryParams;

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        citiesStore[cityName] = {
            name: response.name
        };
        renderCityData(cityName);
    });
}