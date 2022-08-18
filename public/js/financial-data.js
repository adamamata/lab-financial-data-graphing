const currency = 'USD';
const start = '2013-09-01';
const end = '2014-09-01';

const apiBase = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
    .get(`${apiBase}?start=${start}&end=${end}&currency=${currency}`)
    .then((response) => {

        //Getting dates & values
        const dates = Object.keys(response.data.bpi);
        const values = Object.values(response.data.bpi);

        //Printing the chart 
        printChart(dates, values);
    })
    .catch(err => console.log(err));

function printChart(dates, values) {
    //Setting context for canvas
    const ctx = document.getElementById('chart').getContext('2d');
    //Creating Chart
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "BTC Prices",
                backgroundColor: '#000000',
                borderColor: '#FFFFFF',
                data: values
            }],
        },
    });
}