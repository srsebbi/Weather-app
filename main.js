import './style.css';

const search_btn = document.querySelector('#search_btn');
const form = document.querySelector('#form');

search_btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const city = await searchLocation();
  displayData(city);
  // form.reset();
});

function kelvinToCelsius(temperature) {
  return temperature - 273.15;
}

function kelvinToFahrenheit(temperature) {
  return (temperature - 273.15) * (9 / 5) + 32;
}

function displayData(json) {
  const cityName = document.createElement('h1');
  cityName.textContent = `The city is: ${json.name}`;
  const temp = document.createElement('h2');
  temp.textContent = `Temperature: ${kelvinToCelsius(json.main.temp).toFixed(
    2,
  )} °C`;
  document.body.append(cityName);
  document.body.append(temp);
}

async function searchLocation() {
  let search = document.querySelector('input[name=search]').value;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=73b3446ddd2e551f87e99fcb8b8ade42
  `,
    { mode: 'cors' },
  );
  let json = await response.json();
  return json;
}

// displayData(searchLocation());
