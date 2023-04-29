var cityName = "Seattle"
var searchCity = $("#search-city")
var APIkey = "c8af164d906f1649b6b1089b5ec881b1"
var searchButtonEl = $("#search-button")

function getWeather(city){
    //Calls geolocation API
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey)
    .then (function(response){
        response.json()
        .then (function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            //Calls 5 day 3 hour forecast with previous lat and lon
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey)
            .then(function(report){
                report.json()
                .then(function(data){
                    //loops through data parsing one time frame per day
                    for(i = 7; i < data.list.length; i += 8){
                        //converts unix timestamp to day of the week through dayjs
                        var parseDays = dayjs.unix(data.list[i].dt).format('ddd')

                        if (parseDays == "Fri"){
                            console.log(dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY'))
                            console.log(data.list[i])
                        }
                        else if(parseDays == "Sat"){
                            console.log(dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY'))
                            console.log(data.list[i])
                        }
                        else if(parseDays == "Sun"){
                            console.log(dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY'))
                            console.log(data.list[i])
                        }
                        else{
                            return;
                        }
                    }
                })
            })
        })
    })
}

function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        getWeather(city);
    }
}

searchButtonEl.on("click", displayWeather)