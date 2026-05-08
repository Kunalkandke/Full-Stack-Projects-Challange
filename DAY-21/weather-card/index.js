// Live date/time
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('dateTime').textContent = now.toLocaleDateString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 60000);

// Temperature unit toggle
let isCelsius = true;
const tempEl = document.getElementById('temperature');
const feelsLikeEl = document.getElementById('feelsLike');
const celsiusBtn = document.getElementById('celsiusBtn');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');

const tempC = 24;
const feelsC = 21;

function toF(c) { return Math.round(c * 9 / 5 + 32); }

celsiusBtn.addEventListener('click', () => {
  if (isCelsius) return;
  isCelsius = true;
  tempEl.textContent = tempC;
  feelsLikeEl.textContent = tempC + '°';
  celsiusBtn.classList.add('active');
  fahrenheitBtn.classList.remove('active');
  updateForecastUnits();
});

fahrenheitBtn.addEventListener('click', () => {
  if (!isCelsius) return;
  isCelsius = false;
  tempEl.textContent = toF(tempC);
  feelsLikeEl.textContent = toF(feelsC) + '°';
  fahrenheitBtn.classList.add('active');
  celsiusBtn.classList.remove('active');
  updateForecastUnits();
});

const forecastTempsC = [26, 19, 22, 17, 25];
function updateForecastUnits() {
  const fTemps = document.querySelectorAll('.f-temp');
  fTemps.forEach((el, i) => {
    const val = isCelsius ? forecastTempsC[i] : toF(forecastTempsC[i]);
    el.textContent = val + '°';
  });
}

// Refresh button spin animation
const refreshBtn = document.getElementById('refreshBtn');
const weatherData = [
  { icon: '☀', condition: 'Sunny & Clear', temp: 24, humidity: '62%', wind: '14 km/h', bg: 'linear-gradient(135deg,#f6d365,#fda085)' },
  { icon: '⛅', condition: 'Partly Cloudy', temp: 19, humidity: '75%', wind: '20 km/h', bg: 'linear-gradient(135deg,#89f7fe,#66a6ff)' },
  { icon: '🌧', condition: 'Light Rain', temp: 15, humidity: '88%', wind: '25 km/h', bg: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { icon: '⛈', condition: 'Thunderstorm', temp: 12, humidity: '95%', wind: '40 km/h', bg: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)' },
];
let weatherIndex = 0;

refreshBtn.addEventListener('click', () => {
  refreshBtn.classList.add('spinning');
  setTimeout(() => {
    refreshBtn.classList.remove('spinning');
    weatherIndex = (weatherIndex + 1) % weatherData.length;
    const w = weatherData[weatherIndex];
    document.getElementById('weatherIcon').textContent = w.icon;
    document.getElementById('condition').textContent = w.condition;
    document.getElementById('temperature').textContent = isCelsius ? w.temp : toF(w.temp);
    document.getElementById('humidity').textContent = w.humidity;
    document.getElementById('wind').textContent = w.wind;
    document.getElementById('feelsLike').textContent = (isCelsius ? w.temp - 3 : toF(w.temp - 3)) + '°';
    document.body.style.background = w.bg;
  }, 400);
});

// Forecast item highlight
document.querySelectorAll('.forecast-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.forecast-item').forEach(i => i.style.background = '');
    item.style.background = 'rgba(255,255,255,0.2)';
  });
});
