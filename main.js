import './style.css';

const search_btn = document.querySelector('#search_btn');
const form = document.querySelector('#form');

search_btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const city = await searchLocation();
  console.log(city);
  console.log(city.name);
  // form.reset();
});

function CityData(json) {
  const cityName = json.name;
  const temperature = json.main.temp;
}

function displayData(json) {
  const cityName = document.createElement('h1');
  cityName.textContent = `The city is: ${json.name}`;
  const temp = document.createElement('h2');
  temp.textContent = `Temperature: ${json.main.temp}`;
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
