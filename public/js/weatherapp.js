var APIKey = "85b081d82a8b2923ac904659cddb3896";
var city = "London, uk";
var ActualW = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var ForecastW = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
var cordW = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=57&lon=-2.15&appid=85b081d82a8b2923ac904659cddb3896"
//var cordW = "https://api.openweathermap.org/data/2.5/forecast/daily?&appid=85b081d82a8b2923ac904659cddb3896"
var Title = $('#Title')
var TempActual = $('#TempActual')
var TempMin = $('#TempMin')
var TempMax = $('#TempMax')
var iconActual = $('#iconActual')
var Wdescription = $('#Wdescription')
var feelslike = $('#feelslike')
var humidity = $('#humidity')
var pressure = $('#pressure')
var forecast5days = $('#forecast')
var $results = document.querySelector('.results');
var appendToResult
var TempActual1 = $('#TempActual1')

createbuttons()

var placeslist = document.querySelector('#selectplaces');
console.log(placeslist)

  //on window Load the last places visited
  window.onload = function() {

  };

  $('.btn').click(function(){
    var id = $(this).data('x')
    //console.log(this)
    Localstorage = localStorage.getItem("Places");
    ObjectSquema = JSON.parse(Localstorage);
    //console.log(ObjectSquema)
    var cityweather = ""
    ObjectSquema.forEach(element => {
        //console.log(element)
        if (element.geonameId === id){
            cityweather = element
            //console.log("button founded")
         //console.log(element)
         
        }
      });

      console.log(cityweather)
      if (cityweather !== null){
        getWeather(cityweather)
      }else{
          //createbuttons()
      }
      
    //localStorage.setItem(date.toString(),  JSON.stringify(ObjectSquema));
    //location.reload();
});


















//Create the buttons for last places visited
  function createbuttons() {
    var tabledata = localStorage.getItem("Places");
    const myObj = JSON.parse(tabledata);
    if (myObj !== null){
        var buttonplace =""
        myObj.forEach(element => {
            console.log(element['title'])
            buttonplace += `<li><a id="${element['title']}" data-x="${element['geonameId']}" type="button" class="btn buttonplace">${element['title']}</a></li>`
            document.getElementById("selectplaces").innerHTML = buttonplace;
            //console.log(`<li><a id="Birmingham" class="btn">New York</a></li>`)
        });
        }
        if (myObj === null){
            $('#day1').attr("style", "display: none")
        }else{
            getWeather(myObj[0])
        }
        };

//Create the buttons for last places visited
function createForecast(dataf) {
    if (dataf !== null){
        var forecastcards =""
        dataf.forEach(element => {

            var weatherstatus = ""
            if (element['weather'][0]['main'] == "Rain"){
                weatherstatus = "./assets/img/rainy.png"
            }
            if (element['weather'][0]['main'] == "Clouds"){
                weatherstatus = "./assets/img/cloudy.png"
            }
            if (element['weather'][0]['main'] == "Clear"){
                weatherstatus = "./assets/img/sunny.png"
            }



            //url.split('?')[0]
            console.log(element['dt_txt'])
            var dateforecast = element['dt_txt']
            dateforecast = dateforecast.split(' ')[0]
            forecastcards += `<div class="col-sm-2">
            <h5 class="card-title text-center">${dateforecast}</h5>
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="${weatherstatus}" alt="Card image cap" width="173px" height="120px">
              
              <div class="card-body" >
                <h5 class="card-title text-center">Actual Temp: ${element['main']['temp']} C</h5>
                <h5 class="card-title text-center">Min. ${element['main']['temp_min']} C</h5>
                <h5 class="card-title text-center">Max. ${element['main']['temp_max']} C</h5>
                <hr>
                <h5 class="card-title text-center">${element['weather'][0]['description']}</h5>
                <hr>
              </div>
            </div>
            </div>`
            document.getElementById("forecast").innerHTML = forecastcards;
            //console.log(`<li><a id="Birmingham" class="btn">New York</a></li>`)
        });
        }
    };

        

        //Get Weather from place 
function getWeather(value) {
   var places = localStorage.getItem("Places");
   if(places === null){
   
    localStorage.setItem("Places", ("[" + JSON.stringify(value) + "]") );
   }else{
   var placesjson = JSON.parse(places)
   if (placesjson.length > 5){
    placesjson.splice(placesjson, 1)
   }

   id = value['geonameId']
   console.log(`this is the ID: ${id}`)
   var buttonstatus = 0
   placesjson.forEach(element => {
    if (element.geonameId === id){
        buttonstatus = 1
    }
  });

  if (buttonstatus === 0){
    placesjson.push(value)
    placesjson.reverse();
    localStorage.setItem("Places", JSON.stringify(placesjson));
  }
   
   }
    console.log(`information about Location: `);
    console.log(value)
    var lat = value['latitude']
    var long = value['longitude']
    Title.text(value['title'])
   
    $.ajax({
        //https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid={API key}
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=85b081d82a8b2923ac904659cddb3896&units=imperial`
    }).then(function(data) {
       console.log(`information about weather: ${data}`);
       TempActual.text(`Actual Temp: ${data['main']['temp']} F`)
       TempMin.text(`Min Temp: ${data['main']['temp_min']} F`)
       TempMax.text(`Max Temp: ${data['main']['temp_max']} F`)
       feelslike.text(`Feels Like: ${data['main']['feels_like']}`)
       humidity.text(`Humidity: ${data['main']['humidity']}`)
       pressure.text(`Pressure: ${data['main']['pressure']}`)
       Wdescription.text(data['weather'][0]['description'])
       iconActual.attr("src", `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`)
    });
    var cityname = value['title']
    $.ajax({
        
        //url: `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=85b081d82a8b2923ac904659cddb3896&units=imperial`
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIKey}&units=imperial`
    }).then(function(data) {
        if (data !== null){
            $('#day1').attr("style", "display: True")
            day1 = data['list'][0]
            day2 = data['list'][12]
            day3 = data['list'][22]
            day4 = data['list'][32]
            var forecastobj = [day1,day2,day3,day4]
            createForecast(forecastobj)
            console.log("cards maker done!!")
            
        }
     
    });
    


    
    //
}


//Teleport API Autocomplete city 
    TeleportAutocomplete.init('.my-input').on('change', function(value) {
        appendToResult = value
        if (value !== null){
            getWeather(value)
        }
        createbuttons()
        location.reload();
        
        
      
    });
