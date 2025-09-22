function handleSearchSubmit(event) {
  event.preventDefault();
  let SearchInput = document.querySelector("#search-form-input");
  let cityh1 = document.querySelector("#city");
  cityh1.innerHTML = `${SearchInput.value}`;
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
