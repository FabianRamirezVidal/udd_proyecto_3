let temperature = document.querySelector(".temp");
let tempSense = document.querySelector(".tempSense");
let maxTemp = document.querySelector(".maxTemp");
let minTemp = document.querySelector(".minTemp");
let humidity = document.querySelector(".humidity");
let summary = document.querySelector(".summary");
let location = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273.15;
const api_id = "9025ae5819d54f95517bd664b8f5901a";

function getCurrentWeather() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${api_id}`;

            fetch(url_base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    humidity.textContent = "Humidity: " + Math.floor(data.main.humidity) + "%"
                    temperature.textContent = "Temperature: " + Math.floor(data.main.temp - kelvin) + "ºC"
                    tempSense.textContent = "Feels Like: " + Math.floor(data.main.temp - kelvin) + "ºC"
                    maxTemp.textContent = "Max Temperature: " + Math.floor(data.main.temp_max - kelvin) + "ºC"
                    minTemp.textContent = "Min Temperature: " + Math.floor(data.main.temp_min - kelvin) + "ºC"
                    summary.textContent = "Condition: " + data.weather[0].description;
                    location.textContent = "Location: " + data.name + "," + data.sys.country;
                    let icon_image = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
                    icon.innerHTML = "<img width=\"40px\" height=\"40px\">";
                    icon.setAttribute("src", icon_image);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export { getCurrentWeather };
