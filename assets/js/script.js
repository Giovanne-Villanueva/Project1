var cityName = "Placerville"
//fetch("http://api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=c8af164d906f1649b6b1089b5ec881b1")
function getWeather(){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=c8af164d906f1649b6b1089b5ec881b1")
    .then (function(response){
        response.json()
        .then (function(data){
            //console.log(data)
            //console.log("lat: " + data[0].lat)
            //console.log("lon: " + data[0].lon)
            var lat = data[0].lat
            var lon = data[0].lon
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c8af164d906f1649b6b1089b5ec881b1")
            .then(function(report){
                report.json()
                .then(function(data){
                    console.log(data)
                })
            })
        })
    })
}

function init(){
    getWeather()
}

init();