// script.js
const apiKey = 'daf4daad982d6cf72fb7b03f69582457'; // Replace with your OpenWeatherMap API key

async function getWeather(url) {
  const response = await fetch(url);
  return response.json();
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (data.cod === 200) {
    weatherInfo.innerHTML = `
      <p><strong>${data.name}, ${data.sys.country}</strong></p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } else {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  }
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        try {
          const data = await getWeather(url);
          displayWeather(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        document.getElementById('weatherInfo').innerHTML = '<p>Error getting location. Please ensure location services are enabled.</p>';
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

async function getWeatherByLocation() {
  const location = document.getElementById('locationInput').value;
  if (location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
      const data = await getWeather(url);
      displayWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.getElementById('weatherInfo').innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
  } else {
    alert('Please enter a location.');
  }
}
