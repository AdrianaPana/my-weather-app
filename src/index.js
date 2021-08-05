function updateData(response) {
    console.log(response.data);
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `${response.data.wind.speed} Km/h`;
    document.querySelector("#feelsLike").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
    event.preventDefault();
    let apiKey = "55138790f70e5a564e372b7d10cce5ca";
    let cityInput = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(updateData);
}

function retrievePosition(position) {
let apiKey = "55138790f70e5a564e372b7d10cce5ca";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateData);
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

function toFahrenheit() {
    if (isCelsius) {
        let temperature = document.querySelector("#temperature");
        let temp = parseInt(temperature.innerHTML);
        let fahrenheit = Math.round((temp *9/5) + 32);
        temperature.innerHTML = fahrenheit;
        isCelsius = false;
    }
}

function toCelsius() {
    if(!isCelsius) {
        let temperature = document.querySelector("#temperature");
        let temp = parseInt(temperature.innerHTML);
        let celsius = Math.round((temp - 32) * (5/9));
        temperature.innerHTML = celsius;
        isCelsius = true;
    }
}

function initialize() {
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", search);

    let now = new Date();

    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = weekDays[now.getDay()];
    let day = now.getDate();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];

    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    let date = document.querySelector("#date");
    date.innerHTML = `${weekDay}, ${month} ${day}`;

    let time = document.querySelector("#time");
    time.innerHTML = `${hours}:${minutes}`;
    
    let fahrenheit = document.querySelector("#fahrenheit-link");
    fahrenheit.addEventListener("click",  toFahrenheit);

    let celsius = document.querySelector("#celsius-link");
    celsius.addEventListener("click", toCelsius);

    let currentButton = document.querySelector(".currentLocationBtn");
    currentButton.addEventListener("click", getCurrentLocation);
}

let isCelsius = true;

initialize();
getCurrentLocation();