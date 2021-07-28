function updateData(response) {
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector(".degrees").innerHTML = Math.round(response.data.main.temp);
    document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${response.data.wind.speed}Km/h`;
    /* 
    console.log(response.data);
    
    let currentAirQuality = response.data.weather[icon];
    let airQuality = document.querySelector(".airQuality");
    airQuality.innerHTML = `${currentAirQuality}`;
    
    uvIndex

    sunrise

    sunset
*/
}

function search(event) {
     event.preventDefault();
    let apiKey = "55138790f70e5a564e372b7d10cce5ca";
    let cityInput = document.querySelector("#search").value;
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
        let temperature = document.querySelector(".degrees");
        let temp = parseInt(temperature.innerHTML);
        let fahrenheit = Math.round((temp *9/5) + 32);
        temperature.innerHTML = fahrenheit;
        isCelsius = false;
    }
}

function toCelsius() {
    if(!isCelsius) {
        let temperature = document.querySelector(".degrees");
        let temp = parseInt(temperature.innerHTML);
        let celsius = Math.round((temp - 32) * (5/9));
        temperature.innerHTML = celsius;
        isCelsius = true;
    }
}

function initialize() {
    let form = document.querySelector("#searchCity");
    form.addEventListener("submit", search);

    let now = new Date();

    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = weekDays[now.getDay()];
    let day = now.getDate();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];

    let date = document.querySelector(".currentDay");
    date.innerHTML = `${weekDay}, ${month} ${day}`;

    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let time = document.querySelector(".time");
    time.innerHTML = `${hours}:${minutes}`;

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click",  toFahrenheit);

    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", toCelsius);

    let currentButton = document.querySelector("#locationButton");
    currentButton.addEventListener("click", getCurrentLocation);
}

let isCelsius = true;

initialize();
getCurrentLocation();