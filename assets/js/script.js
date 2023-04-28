var cityName = "Seattle"

function getWeather(){
    //Calls geolocation API
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=c8af164d906f1649b6b1089b5ec881b1")
    .then (function(response){
        response.json()
        .then (function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            //Calls 5 day 3 hour forecast with previous lat and lon
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c8af164d906f1649b6b1089b5ec881b1")
            .then(function(report){
                report.json()
                .then(function(data){
                    //loops through data parsing one time frame per day
                    for(i = 7; i < data.list.length; i += 8){
                        //converts unix timestamp to day of the week through day js
                        var parseDays = dayjs.unix(data.list[i].dt).format('ddd')
                        //console.log(parseDays)
                        if (parseDays == "Fri"){
                            console.log("This is Friday:")
                            console.log(data.list[i])
                        }
                        else if(parseDays == "Sat"){
                            console.log("This is Saturday:")
                            console.log(data.list[i])
                        }
                        else if(parseDays == "Sun"){
                            console.log("This is Sunday:")
                            console.log(data.list[i])
                        }
                        else{
                            console.log("trash data")
                        }
                    }
                })
            })
        })
    })
}

function init(){
    getWeather()
}

init();