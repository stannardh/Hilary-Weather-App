let now = new Date();

let date = now.getDate();

let day = now.getDay();

let month = now.getMonth();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let currentDay = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

let currentMonth = months[now.getMonth()];

let hour = now.getHours();
let minutes = now.getMinutes();

let formatDate = `${currentDay}, ${currentMonth} ${date}`;
let currentTime = `${hour}:${minutes}`;
let h4 = document.querySelector("h4");
h4.innerHTML = `${formatDate} ${currentTime}`;


//current location weather//

function displayWeatherCondition(response){
console.log(response)
document.querySelector("h5").innerHTML = response.data.name;
let currentTemperatureMetric = Math.round(response.data.main.temp);
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = `${currentTemperatureMetric}°C`
}

function searchLocation(position){
let apiKey ="8f30be199033ade64232dc35e4dc5496"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}


let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentLocation)

//search form weather//

function searchCity(city){
  let searchapiKey = "4c3c671c267c67d5291f03e40c1f4165"
  let searchapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${searchapiKey}&units=metric`
  axios.get(searchapiUrl).then(displayWeatherCondition)
}

function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#city-search").value;
searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);