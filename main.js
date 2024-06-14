const api={
  key:"449380a0fb13c8e7549ed88315dddf3c",
  base:"https://api.openweathermap.org/data/2.5/"
}

const searchBox=document.querySelector(".search-box")
searchBox.addEventListener("keypress",setQuery)

function setQuery(evt)
{
  if(evt.keyCode==13)
  {
    getResults(searchBox.value);
    console.log(searchBox.value)
  }
  
}

function getResults(query)
{
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather=>{
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather)
{
  let city =document.querySelector('.location .city');
  city.innerText=`${weather.name}, ${weather.sys.country}`

  let now = new Date();
  let date=document.querySelector('.location .date');

  date.innerText=dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el=document.querySelector('.current .weather');
  weather_el.innerText=weather.weather[0].main;

  let hi_low=document.querySelector('.hi-low');
  hi_low.innerText=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder(d)
{
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

let day = days[d.getDay()];
let date = d.getDay();
let month= months[d.getMonth()];
let year=d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}