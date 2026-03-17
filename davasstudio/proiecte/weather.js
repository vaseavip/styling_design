const API_KEY = 'bcfad8268a7b33f2f6c5c7eff810e131'; // Replace with your OpenWeatherMap API key

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const resultSection = document.getElementById('result');
const loadingIndicator = document.getElementById('loading');
const errorAlert = document.getElementById('result-error');

const resultCity = document.getElementById('result-city');
const resultStatus = document.getElementById('result-status');
const resultIcon = document.getElementById('result-icon');
const resultTemp = document.getElementById('result-temp');
const resultHumidity = document.getElementById('result-humidity');
const resultWind = document.getElementById('result-wind');
const resultFeels = document.getElementById('result-feels');

const showLoading = (show) => {
  loadingIndicator.classList.toggle('d-none', !show);
  resultSection.classList.toggle('d-none', show);
  errorAlert.classList.add('d-none');
};

const showError = (message) => {
  errorAlert.textContent = message;
  errorAlert.classList.remove('d-none');
  resultSection.classList.add('d-none');
  loadingIndicator.classList.add('d-none');
};

const formatWind = (speed) => {
  return `${speed.toFixed(1)} m/s`;
};

const formatTemp = (temp) => {
  return `${temp.toFixed(1)} °C`;
};

const getIcon = (iconCode) => {
  return `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon" />`;
};

const renderWeather = (data) => {
  const { name, sys, main, weather, wind } = data;

  resultCity.textContent = `${name}, ${sys.country}`;
  resultStatus.textContent = weather[0]?.description ?? '';
  resultIcon.innerHTML = getIcon(weather[0]?.icon);
  resultTemp.textContent = formatTemp(main.temp);
  resultFeels.textContent = formatTemp(main.feels_like);
  resultHumidity.textContent = `${main.humidity}%`;
  resultWind.textContent = formatWind(wind.speed);

  resultSection.classList.remove('d-none');
  loadingIndicator.classList.add('d-none');
  errorAlert.classList.add('d-none');
};

const fetchWeather = async (city, country) => {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    showError('Please set your OpenWeatherMap API key in weather.js.');
    return;
  }

  showLoading(true);

  try {
    const params = new URLSearchParams({
      q: `${city},${country}`,
      units: 'metric',
      appid: API_KEY,
    });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unable to fetch weather data.');
    }

    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    showError(error.message);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  const country = countryInput.value.trim();

  if (!city || !country) {
    showError('Please enter both city and country.');
    return;
  }

  fetchWeather(city, country);
});
