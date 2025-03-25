// app.js
const apiKey = "04d0508e5f755e1deb3c5f6cfaff4b55"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const geolocationButton = document.getElementById("geolocation-button");
const weatherInfo = document.querySelector(".weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const loadingSpinner = document.getElementById("loading-spinner");

const themeSwitch = document.getElementById("theme-switch");

let currentTheme = localStorage.getItem("theme") || "light";
applyTheme(currentTheme);

themeSwitch.addEventListener("change", function() {
  if (themeSwitch.checked) {
    currentTheme = "dark";
  } else {
    currentTheme = "light";
  }
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
});

searchButton.addEventListener("click", function() {
  const city = cityInput.value;
  if (city) {
    getWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});

geolocationButton.addEventListener("click", function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherDataByCoords(lat, lon);
    }, function(error) {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

function getWeatherData(city) {
  showLoading(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherInfo(data);
        showLoading(false);
      } else {
        alert("City not found!");
        showLoading(false);
      }
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
      showLoading(false);
    });
}

function getWeatherDataByCoords(lat, lon) {
  showLoading(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherInfo(data);
      showLoading(false);
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
      showLoading(false);
    });
}

function displayWeatherInfo(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  sunrise.textContent = `Sunrise: ${sunriseTime}`;
  sunset.textContent = `Sunset: ${sunsetTime}`;

  weatherInfo.style.display = "block";
}

function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.style.display = "block";
  } else {
    loadingSpinner.style.display = "none";
  }
}
