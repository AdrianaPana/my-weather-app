function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    let hourMinutes = date.toLocaleString('eu-US', {hour:'numeric', minute:'numeric', hour12:true});

    return `${day} ${hourMinutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;    
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML = 
                    forecastHTML + 
                    `
                        <div class="col-2">
                            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                            <img
                            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                            alt=""
                            width="42"
                            />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                                <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                            </div>
                        </div>
                `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} Km/h`;
    document.querySelector("#feelsLike").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function currentLocationWeather() {
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

let apiKey = "55138790f70e5a564e372b7d10cce5ca";

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector(".currentLocationBtn");
currentButton.addEventListener("click", currentLocationWeather);

search("New York");