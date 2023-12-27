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
  let currentIcon = `<img src="${iconUrl}" />`;
  let iconElement = document.querySelector("#icon");

  currentCity.innerHTML = response.data.city;
  currentTime.innerHTML = formatDate(cityDate);
  currentCondition.innerHTML = `${response.data.condition.description}`;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  currentTemperature.innerHTML = Math.round(temperature);
  iconElement.innerHTML = currentIcon;
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

function displayForecast(forecast) {
  let dayValues = [1, 2, 3, 4, 5];
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHtml = "";

  dayValues.forEach(function (value) {
    let forecastDate = new Date(forecast.data.daily[value].time * 1000);
    let forecastDay = weekDays[forecastDate.getDay()];
    let dayIcon = forecast.data.daily[value].condition.icon_url;
    let minTemp = Math.round(forecast.data.daily[value].temperature.minimum);
    let maxTemp = Math.round(forecast.data.daily[value].temperature.maximum);
    forecastHtml += `
    <div class="day-container">
      <div class="forecast-day">${forecastDay}</div>
      <div class="forecast-icon"><img src="${dayIcon}"/></div>
      <div class="forecast-temp">
        <span class = "min-temp"><strong>${minTemp}&deg</strong></span> 
        <span class = "max-temp">${maxTemp}&deg</span>
      </div>
    </div>`;
  });

  let weatherForecast = document.querySelector("#forecast-container");
  weatherForecast.innerHTML = forecastHtml;
}

function getWeatherReport(city) {
  let apiKey = "ct3573bb77o0c90643baf9f5552218f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
  axios.get(apiForecast).then(displayForecast);
}

function searchWeather(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#search-input");

  getWeatherReport(searchCityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeather);

getWeatherReport("Pretoria");
