function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`
};
if (hours < 10) {
hours = `0${hours}`
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`

}



function formatHours(timestamp){
 let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`
};
if (hours < 10) {
hours = `0${hours}`
}

 return `${hours}:${minutes}`;
}



//current location weather//



function displayTemperature(response){
  console.log(response)
document.querySelector("h5").innerHTML = response.data.name;
celsiusTemperature = response.data.main.temp
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
let windElement = document.querySelector("#wind");
windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description)


}

function searchLocation(position){
let apiKey ="8f30be199033ade64232dc35e4dc5496"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
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
  axios.get(searchapiUrl).then(displayTemperature)
}

function displayFahrenheit(event){
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
fahrenheitLink.classList.add("active");
celsiusLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelsius(event){
event.preventDefault();
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

let celsiusTemperature = null


function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#city-search").value;
searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);