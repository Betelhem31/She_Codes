function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temprature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityh1 = document.querySelector("#city");
  cityh1.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let date = new Date(response.data.time * 1000);
  //TODO:google how to format date "js parse timestamp"
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDay(date);
}

function formatDay(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "ob0b34bc0a25c05530t69fd67a4bbafb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //make api call update the ui
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let SearchInput = document.querySelector("#search-form-input");

  searchCity(SearchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Addis Ababa");
