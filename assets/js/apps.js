
const printCharts = () => {

    rendermodelsChart()
}

function rendermodelsChart() {

    const data = {
        labels: ["uno", "dos", "tres"],
        datasets: [{
            data: [10,20, 30]
        }]
    }

    new Chart('modelsChart', { type: 'line', data })
}

printCharts()