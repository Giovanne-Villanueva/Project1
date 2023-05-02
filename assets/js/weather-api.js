var searchCity = $("#search-city")
var APIkey = "c8af164d906f1649b6b1089b5ec881b1"
var searchButtonEl = $("#search-button")
var clearButtonEl = $("#clear-button")

// This function calls the openweathermap api twice with user input
// Once is to take the given city name and parse out the latitude and longitude
// The second is to take the above information and get the 5 day forecast
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
                        forecast(parseDays, data);
                    }
                })
            })
        })
    })
}

//When called, this function will check if the forecast contains a Friday, Saturday, or Sunday, and display information to the correct day.
function forecast(parseDays, data){
    if (parseDays == "Fri"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity0").html(humidity+"%")
        $("#fDate0").html(date)
        $("#fTemp0").html(tempF+"&#8457");
    }
    else if(parseDays == "Sat"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity1").html(humidity+"%")
        $("#fDate1").html(date)
        $("#fTemp1").html(tempF+"&#8457");
    }
    else if(parseDays == "Sun"){
        var date = dayjs.unix(data.list[i].dt).format('dddd, MMM D, YYYY')
        var humidity= data.list[i].main.humidity;
        var tempK= data.list[i].main.temp;
        var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);

        $("#fHumidity2").html(humidity+"%")
        $("#fDate2").html(date)
        $("#fTemp2").html(tempF+"&#8457");
    }
    else{
        return;
    }
}

//Function to start the proccess to getWeather and display
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        getWeather(city);
    }
}

//Adds searched city to a history section
function addToList(event){
    event.preventDefault();
    var listEl= $("<li>" + city + "</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",city);
    $(".History").append(listEl);
}

//When a previous result is clicked, it will search using that name again
function invokePastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        getWeather(city);
    }

}

//When the button is clicked, sets the history ul to empty.
function clearHistory(event){
    event.preventDefault();
    $(".History").empty();
}

$("#planner-button").on("click",function(){
    document.location.replace('./planner.html');
})
$(document).on("click",invokePastSearch);
searchButtonEl.on("click", displayWeather)
searchButtonEl.on("click", addToList)
clearButtonEl.on("click", clearHistory)