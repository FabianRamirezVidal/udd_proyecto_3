let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let location = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273.15;

window.addEventListener("load",()=> {
  if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    const api_id = "9025ae5819d54f95517bd664b8f5901a"
    const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&`+`lon=${lon}&appid=${api_id}`;

    fetch(url_base)
    .then((response) => {

      return response.json();

    })
    .then((data) => {
console.log("esta es la data")
console.log(data);

temperature.textContent = Math.floor(data.main.temp - kelvin) + "ºC"
summary.textContent = data.weather[0].description;
location.textContent = data.name + ","+ data.sys.country;
let icon_image = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
icon.innerHTML = "<img width=\"40px\" height=\"40px\">";
icon.setAttribute ("src",icon_image) 
    });
  });
});
