const kelvin = 273.15;
const api_id = "9025ae5819d54f95517bd664b8f5901a";

function getWeatherForecast() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            const url_fore = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&` + `lon=${lon}&appid=${api_id}`;

            fetch(url_fore)
                .then((response) => {
                    return response.json();
                })
                .then((dataFore) => {
                    const data1 = dataFore.list;
                    let labels = data1.map(function (element) {
                        return element.dt_txt;
                    });
                    let temps = data1.map(function (element) {
                        return Math.floor(element.main.temp - kelvin);
                    });

                    const ctx = document.getElementById('myChart');

                    new Chart(ctx, {
                        type: 'line',
                        mantainAspectRatio: false,
                        responsive: true,
                        resizeDelay: 0,
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
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export { getWeatherForecast };
