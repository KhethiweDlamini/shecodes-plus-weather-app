function refreshWeather(response) {
  let currentCity = document.querySelector("#current-city");
  let currentCondition = document.querySelector("#current-condition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let currentTemperature = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;

  let currentTime = document.querySelector("#current-date");
  let cityDate = new Date(response.data.time * 1000);

  let iconUrl = response.data.condition.icon_url;

  currentCity.innerHTML = response.data.city;
  currentTime.innerHTML = formatDate(cityDate);
  currentCondition.innerHTML = `${response.data.condition.description}`;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentTemperature.innerHTML = Math.round(temperature);
  currentWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;
}

function formatDate(cityDate) {
  let hours = cityDate.getHours();
  let minutes = cityDate.getMinutes();
  let day = cityDate.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekDays[day]} ${hours}:${minutes},`;
}

function getCityUrl(city) {
  let apiKey = "ct3573bb77o0c90643baf9f5552218f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchWeather(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#search-input");

  getCityUrl(searchCityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeather);

getCityUrl("Pretoria");
