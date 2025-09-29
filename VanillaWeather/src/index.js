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

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`;

  getForecast(response.data.city);
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

//t display the date
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ob0b34bc0a25c05530t69fd67a4bbafb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forcast-day">
      <div class="weather-forcast-date">${formatDay(day.time)}</div>
      <div >
      <img src="${day.condition.icon_url}" class="weather-forcast-icon"/>
      </div>
      <div class="weather-forcast-temps">
        <div class="weather-forcast-temp">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div class="weather-forcast-temp">${Math.round(
          day.temperature.minimum
        )}°</div>
      </div>
    </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Addis Ababa");
