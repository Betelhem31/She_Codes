function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temprature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityh1 = document.querySelector("#city");
  cityh1.innerHTML = response.data.city;
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
