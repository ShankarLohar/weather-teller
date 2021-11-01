
let weather = {
    apiKey: API_KEY,
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity,feels_like,pressure,temp_min,temp_max } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;

        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description + "\nFeels Like " + feels_like + "°C";


        document.querySelector(".temp").innerText = temp + "°C" ;
        document.querySelector(".humidity").innerText = "\nMax. Temp " + temp_max + "°C"+"\nMin. Temp " + temp_min + "°C";

        document.querySelector(".wind").innerText =
        "\nHumidity: " + humidity + "%" +"\nPressure: " + pressure+"\nWind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Kolkata");
