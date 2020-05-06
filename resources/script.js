$("#test").on("click", function(){
    console.log("Hello, World!");
});

var citiesStore = localStorage.getItem("weatherByCity");

if (!citiesStore){
    citiesStore = {};
}

function renderCityData(cityName){
    
}

function getCityData(cityName){
    
}

function fetchCityData(cityName){
    
}

var queryUrl = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
var apiKey = "9fc203891252cc2336158c490f709da2";
var cityName = "Big Bear Lake";

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
    console.log(response);
});