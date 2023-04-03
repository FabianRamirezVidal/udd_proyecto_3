let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let location = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273.15;
const api_id = "9025ae5819d54f95517bd664b8f5901a";



window.addEventListener("load",()=> {
  if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    
    const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&`+`lon=${lon}&appid=${api_id}`;

    fetch(url_base)
    .then((response) => {

      return response.json();

    })
    .then((data) => {
console.log("esta es la data")
console.log(data);

temperature.textContent = "Temperature: " + Math.floor(data.main.temp - kelvin) + "ºC"
summary.textContent = "Condition: " + data.weather[0].description;
location.textContent = "Location: " + data.name + ","+ data.sys.country;
let icon_image = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
icon.innerHTML = "<img width=\"40px\" height=\"40px\">";
icon.setAttribute ("src",icon_image) 
    });
  });
});

window.addEventListener("load",()=> {
  if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    
    const url_fore = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&`+`lon=${lon}&appid=${api_id}`;

    getForecast();
    async function getForecast() {
    const forecastData = await fetch(url_fore);
    const dataFore = await forecastData.json();
    console.log(dataFore)
    const data1 = dataFore.list
    console.log(data1)
    let labels = data1.map(function(element){
      return element.dt_txt
    })
    console.log(labels)
    let temps = data1.map(function(element){
      return Math.floor(element.main.temp - kelvin)
    })
    
    console.log(temps)

    const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    mantainAspectRatio: false,
    responsive: true,
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperatura en ºC',
        data: temps,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
    
    
    //let labels = dataFore.map(function(dtTxt){})
    
  }

    });
  });
