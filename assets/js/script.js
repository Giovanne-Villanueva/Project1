var cityName = "London"

function getWeather(){
    var weatherAPI = fetch("http://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=c8af164d906f1649b6b1089b5ec881b1")
    .then (function(weatherAPI){
        weatherAPI.json()
        .then (function(data){
            console.log(data)
        })
    })
}

function init(){
    getWeather()
}

init();