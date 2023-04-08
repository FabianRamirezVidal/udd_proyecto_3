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
                    console.log(data1)
                    let labels = data1.map(function (element) {
                        return element.dt_txt;
                    });
                    let temps = data1.map(function (element) {
                        return Math.floor(element.main.temp - kelvin);
                    });
                    let hums = data1.map(function (element) {
                        return Math.floor(element.main.humidity);
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
                                yAxisID:"y",
                                borderWidth: 1},{
                                label: 'Humedad en %',
                                data: hums,
                                yAxisID:"percentage"
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    type: "linear",
                                    position: "left",
                                    ticks: {
                                        callback: function(value, index, values) {
                                            return `${value} ºC`
                                        },
                                    }
                                },
                                percentage: {
                                    beginAtZero: false,
                                    type: "linear",
                                    position: "right",
                                    ticks: {
                                        callback: function(value, index, values) {
                                            return `${value} %`
                                        },
                                    }
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
