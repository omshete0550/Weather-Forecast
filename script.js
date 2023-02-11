
let City = "";



let weather = {
    apiKey: "15c3f4d61776e75be1b3a5dfaf3460aa",
    fetchWeather: function(city) {
        City = city;
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" 
            + city 
            + "&appid=" 
            + this.apiKey
          )
          .then((response) => response.json())
        .then((data) => this.displayWeather(data.list[0])); 
        // .then((data) =>console.log(data.list[0]));  
    },
    displayWeather: function(data) {
        // const  { name } = City;
        
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(City, icon, description, temp, humidity, speed);
        let celcius = parseInt(temp - 273.15);
        document.querySelector('.city').innerText = "Weather in " + City;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.temp').innerHTML = celcius + "&#176; C";
        document.querySelector('.description').innerText = description;
        document.querySelector('.wind').innerText = "Wind speed: " + speed + "km/hr";
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector(".weather").classList.remove(".loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + City + "')"
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};


document.querySelector(".search button")
.addEventListener('click', function () {
    weather.search();
});

document.querySelector(".search-bar")
.addEventListener('keyup', function (event) {
    if(event.key == "Enter" ){
        weather.search();
    }
});

weather.fetchWeather("Denver");