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

async function getCurrentWeather() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, (error) => {
            reject(error);
        });
    });
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${api_id}`;

    try {
        const response = await fetch(url_base);
        const data = await response.json();
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
    } catch (error) {
        console.error(error);
    }
}

export { getCurrentWeather };
