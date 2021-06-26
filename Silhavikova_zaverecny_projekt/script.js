let weather = {
    apiKey: "9d81f240d5184142a16d2c70e73a110f",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&lang=cz&appid=" 
            + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
              alert("Hledaný výraz neexistuje.");
              localStorage.clear();
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { icon, description, main } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;
        console.log(name, icon, description, temp, humidity, speed, main, country)
        document.querySelector(".city").innerText = name + ", " + country;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".flag").src = "https://www.countryflags.io/" + country + "/flat/32.png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Vlhkost vzduchu: " + humidity + "%";
        document.querySelector(".wind").innerText = "Rychlost větru: " + speed + " km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1280x720/?" + main + "')"
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.querySelector(".weather").classList.remove("loading");
        buildMap(latitude, longitude);
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
        localStorage.setItem("mesto", document.querySelector(".search-bar").value);
        console.log(localStorage.getItem("mesto"));
        document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    },
};

document
.querySelector(".search-button")
.addEventListener("click", function () {
    weather.search();
});

document
.querySelector(".memory")
.addEventListener("click", function () {
    var storedValue = localStorage.getItem("mesto");
    weather.fetchWeather(storedValue);
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter")
    {
        weather.search();
    }
});

function showTime(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var day =d.getDay();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    switch(month){
        case 1:
            month="Leden";
            break;
        case 2:
            month="Únor";
            break;
        case 3:
            month="Březen";
            break;
        case 4:
            month="Duben";
            break;
        case 5:
            month="Květen"
            break;
        case 6:
            month="Červen"
            break;
        case 7:
            month="Červenec"
            break;
        case 8:
            month="Srpen"
            break;
        case 9:
            month="Září"
            break;
        case 10:
            month="Říjen"
            break;
        case 11:
            month="Listopad"
            break;
        case 12:
            month="Prosinec"
            break;
        default:

    }

    switch(day){
        case 1:
            day="Pondělí";
            break;
        case 2:
            day="Úterý";
            break;
        case 3:
            day="Středa";
            break;
        case 4:
            day="Čtvrtek";
            break;
        case 5:
            day="Pátek";
            break;
        case 6:
            day="Sobota";
            break;
        case 7:
            day="Neděle";
            break;
        default:   
    }

    hour = ("0" + hour).slice(-2);
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);

    document.getElementById("clock").innerHTML = day + ", " + date + ". " + month + " " + year + ", " + hour + ":" + min + ":" + sec;
}

function myFunction() {
    var x = document.getElementById("weathermap");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

function buildMap(lat,lon)  {
    document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, 
      { 
       minZoom: 11,
       maxZoom:13,
       attribution: osmAttribution,
      });
    var map = new L.Map('map');
    var marker = new L.marker([lat,lon]).addTo(map)
    map.setView(new L.LatLng(lat,lon), 13 );
    map.addLayer(osmLayer);
}

//weather.fetchWeather("Zlín");
function getGeolocation() {
    fetch(
        "http://www.geoplugin.net/json.gp"
    )
    .then((response) => response.json())
    .then((data) => weather.fetchWeather(data.geoplugin_city))
}

getGeolocation();
setInterval(showTime,1000);