let inputBox = document.querySelector('.input-box');
let searchBtn = document.querySelector('#searchBtn');
let weather_img = document.querySelector('.weather-img');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let humidity = document.querySelector('#humidity');
let wind_speed = document.querySelector('#wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    let api_key = 'b874fbd11973593a803a94e7d83cd243';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    let weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
    }
    else {
        console.log("run");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        if (weather_data.weather[0].main == 'Clouds') {
            weather_img.src = "/cloud.png";
        }
        else if (weather_data.weather[0].main == 'Clear') {
            weather_img.src = "/clear.png";
        }
        else if (weather_data.weather[0].main == 'Rain') {
            weather_img.src = "/rain.png";
        }
        else if (weather_data.weather[0].main == 'Mist') {
            weather_img.src = "/Mist.png";
        }
        else {
            weather_img.src = "/snow.png";
        }
    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})