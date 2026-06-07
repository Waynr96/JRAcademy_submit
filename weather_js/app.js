// const API_KEY = "";

const cities = {
  Sydney: { lat: -33.8688, lon: 151.2093 },
  Melbourne: { lat: -37.8136, lon: 144.9631 },
  Adelaide: { lat: -34.9285, lon: 138.6007 },
  Brisbane: { lat: -27.4698, lon: 153.0251 },
  Perth: { lat: -31.9505, lon: 115.8605 },
  Canberra: { lat: -35.2809, lon: 149.13 },
  Darwin: { lat: -12.4634, lon: 130.8456 },
  Hobart: { lat: -42.8821, lon: 147.3272 },
};

const conditionIcons = {
  CLEAR: "☀️",
  MOSTLY_CLEAR: "🌤️",
  PARTLY_CLOUDY: "⛅",
  MOSTLY_CLOUDY: "🌥️",
  CLOUDY: "☁️",
  WINDY: "💨",
  DRIZZLE: "🌦️",
  RAIN: "🌧️",
  HEAVY_RAIN: "🌧️",
  THUNDERSTORM: "⛈️",
  SNOW: "❄️",
  FOG: "🌫️",
  HAZE: "🌫️",
};

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const errorEl = document.getElementById("errorMsg");
  const resultEl = document.getElementById("weatherResult");

  errorEl.classList.add("hidden");
  resultEl.classList.add("hidden");

  if (!city) {
    errorEl.textContent = "Please select a city.";
    errorEl.classList.remove("hidden");
    return;
  }

  const { lat, lon } = cities[city];
  const url = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${lon}&unitsSystem=METRIC`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    console.log("Weather data:", data);
    document.getElementById("cityName").textContent = city;
    document.getElementById("temperature").textContent =
      `${Math.round(data.temperature.degrees)}°C`;
    document.getElementById("description").textContent =
      data.weatherCondition?.description?.text ?? "";
    document.getElementById("weatherIcon").textContent =
      conditionIcons[data.weatherCondition?.type] ?? "🌡️";
    document.getElementById("humidity").textContent =
      `${data.relativeHumidity ?? "--"}%`;
    document.getElementById("wind").textContent =
      `${Math.round(data.wind?.speed?.value ?? 0)} km/h`;
    document.getElementById("precipitation").textContent =
      `${data.precipitation?.probability?.percent ?? "--"}%`;

    resultEl.classList.remove("hidden");
  } catch (err) {
    errorEl.textContent = err.message || "Could not load weather data.";
    errorEl.classList.remove("hidden");
  }
});
