$(document).ready(function() {
  // set global vars for BG pictures
  var coldURL = "http://host2post.com/server13/photos/S1H-6hjE6S1FUM~/wallpapers-trees-full-snow-cold-weather-december-mountains.jpg";
  var mediumURL = "http://xbmc-favorites.googlecode.com/svn/trunk/skin/MARK-III/media/weather-background.png";
  var warmURL = "http://cdn.meteo-europ.com/img/background/background.jpg";
  // set other global vars
  var localWeather = {};
  var convertedTemp = 0, convertedMax = 0, convertedMin = 0;
  var lat = 0 , long = 0;

  // Check if browser provides location
  if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      getWeather(lat, long);
    });
  } else {
    /* geolocation IS NOT available */
    console.log("Geolocation is not available, falling back to manual mode.");
    // Let use input address
    $("#com_box").removeClass("hidden");
  }

  // Make the weather request
  function getWeather(lat, long) {
    gettingData = true;
    var APIKey = 'fac0fa8a545361692244689ce37ebd1e';
    var requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=" + APIKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
  }

  // Take the JSON results and proccess them
  var proccessResults = function() {
    var results = JSON.parse(this.responseText);
    if (results) {
      localWeather.city        = results.name;
      localWeather.weather     = results.weather[0].main;
      localWeather.temperature = results.main.temp;          // in Kelvin
      localWeather.minTemp     = results.main.temp_min;      // in Kelvin
      localWeather.maxTemp     = results.main.temp_max;      // in Kelvin
      localWeather.humidity    = results.main.humidity;
      localWeather.pressure    = results.main.pressure;
      localWeather.windSpeed   = results.wind.speed;
      localWeather.windDegrees = getWindDirection(results.wind.deg);
      localWeather.windGust    = results.wind.gust ? results.wind.gust : 0;
      localWeather.icon        = "http://openweathermap.org/img/w/" + results.weather[0].icon  + ".png";
      localWeather.coordinates = [results.coord.lon, results.coord.lat];
      }

      // Set background image depending on temperature
      if (localWeather.temperature > 302) {
        // it's warm, display the hot picture
        $('html').css('background-image', 'url(' + warmURL + ')');
      } else if (localWeather.temperature < 273){
        // It's cold, display snowy picture
        $('html').css('background-image', 'url(' + coldURL + ')');
      } else {
        // display genric picture
        $('html').css('background-image', 'url(' + mediumURL + ')');
      }

      // Add weather icon and city name to header
      $('#place').html("<img src='" + localWeather.icon + "'>&nbsp;" + localWeather.city);

      // Determine which radio button is checked and display temp accordingly
      if($('input[name=conv]:checked', '#myForm').val() == "F"){
        displayTempInFahrenheit();
      } else {
        displayTempInCelsius();
      }
  };

  function displayTempInFahrenheit(){
    convertedTemp = convertKelvinToFahrenheit(localWeather.temperature);
    convertedMax  = convertKelvinToFahrenheit(localWeather.maxTemp);
    convertedMin  = convertKelvinToFahrenheit(localWeather.minTemp);
    displayTable(convertedTemp, convertedMax, convertedMin);
  }

  function displayTempInCelsius(){
    convertedTemp = convertKelvinToCelsius(localWeather.temperature);
    convertedMax  = convertKelvinToCelsius(localWeather.maxTemp);
    convertedMin  = convertKelvinToCelsius(localWeather.minTemp);
    displayTable(convertedTemp, convertedMax, convertedMin);
  }

  function displayTable(convertedTemp, convertedMax, convertedMin){
    var htmlString  = "<table width='360'>";
      htmlString += "<tr><td>Weather:</td><td>"       + localWeather.weather      + "</td></tr>";
      htmlString += "<tr><td>Current Temp:</td><td>"  + convertedTemp             + "</td></tr>";
      htmlString += "<tr><td>Min Temp:</td><td>"      + convertedMin              + "</td></tr>";
      htmlString += "<tr><td>Max Temp:</td><td>"      + convertedMax              + "</td></tr>";
      htmlString += "<tr><td>Rel. Humidity:</td><td>" + localWeather.humidity     + " %</td></tr>";
      htmlString += "<tr><td>Pressure:</td><td>"      + localWeather.pressure     + " (mb)</td></tr>";
      htmlString += "<tr><td>Wind speed:</td><td>"    + localWeather.windSpeed    + "</td></tr>";
      htmlString += "<tr><td>Wind direction:</td><td>"+ localWeather.windDegrees  + "</td></tr>";
      htmlString += "<tr><td>Wind gust:</td><td>"     + localWeather.windGust     + "</td></tr>";
      htmlString  += "</table>";
      $('#weather_box').html(htmlString);
  }

  // when radio buttons are selected take action
  $('#myForm').on('change', 'input[id="C"]', function() {
        //  Celsius selected
        displayTempInCelsius();
    });

  $('#myForm').on('change', 'input[id="F"]', function() {
        //  Celsius selected
        displayTempInFahrenheit();
    });

});


function convertKelvinToFahrenheit(temp){
  return parseInt((temp - 273.15) * 1.8 +32);
}

  function convertKelvinToCelsius(temp){
    return parseInt(temp - 273.15);
}

function getLocationFromAddress(){
  var address = $("#address").val();
  if (address !== ""){
    console.log("Getting Lat/Lon for", address);
    $("#com_box").addClass("hidden");
    getGeoLocation(address);
  }
}

function getGeoLocation(address){
  var geocoder =  new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      long = results[0].geometry.location.lng();
      console.log("location : " + lat + " " + long);
      getWeather(lat, long);
    } else {
      console.log("Something went wrong " + status);
    }
  });
}

function getWindDirection(degrees){
    degrees = Math.floor(degrees);
    var val = Math.floor((( degrees + (360 / 16) / 2) % 360) / (360/16)  );
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return degrees.toString() + "&deg; (" + arr[val] + ")";
}




