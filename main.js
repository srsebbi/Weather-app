import './style.css';

// New city constructor
function NewSearch(city) {
  const name = city.name;
  const temp = city.main.temp;
  const kelvinToCelsius = (temperature) => {
    return temperature - 273.15;
  };
  const celsiusToFahrenheit = (temperature) => {
    return (temperature * (9 / 5) + 32).toFixed(2);
  };
  const kelvinToFahrenheit = (temperature) => {
    return ((temperature - 273.15) * (9 / 5) + 32).toFixed(2);
  };
  return {
    name,
    temp,
    kelvinToCelsius,
    celsiusToFahrenheit,
    kelvinToFahrenheit,
  };
}

// Display the search info
function displayCity(city) {
  const cityName = document.querySelector('.city_name');
  cityName.textContent = `The city is: ${city.name}`;
  const temp = document.querySelector('.city_temp');
  temp.textContent = `Temperature: ${city.kelvinToCelsius(city.temp)} °C`;
  changeUnit(city);
}

// Fetch the search
async function searchLocation() {
  // Search input
  let search = document.querySelector('input[name=search]').value;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=73b3446ddd2e551f87e99fcb8b8ade42
  `,
    { mode: 'cors' },
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const city_container = document.querySelector('.city_container');
  city_container.classList.remove('active');
});

const search_btn = document.querySelector('#search_btn');
const form = document.querySelector('#form');
// Display search data
search_btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const city = await searchLocation();
  const newCity = await NewSearch(city);
  displayCity(newCity);
  const city_container = document.querySelector('.city_container');

  // Opacity functionality class
  city_container.classList.add('active');
  form.reset();
});

// Change units in display
const change_unit_btn = document.querySelector('#change_unit');

function changeUnit(city) {
  change_unit_btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Display Fahrenheit
    if (change_unit_btn.textContent === 'Temp in Fahrenheit') {
      const temp = document.querySelector('.city_temp');
      const actualTemp = city.temp;
      temp.textContent = `Temperature: ${city.kelvinToFahrenheit(
        actualTemp,
      )} °F`;
      change_unit_btn.textContent = 'Temp in Celsius';

      // Display Celsius
    } else {
      const temp = document.querySelector('.city_temp');
      const actualTemp = city.temp;
      temp.textContent = `Temperature: ${city.kelvinToCelsius(actualTemp)} °C`;
      change_unit_btn.textContent = 'Temp in Fahrenheit';
    }
  });
}
