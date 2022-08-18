//Global variables
const currency = 'USD';
let start = '2013-09-01'; //Initial value for start-date
let end = '2014-09-01'; //Initial value for end-date 
const apiBase = 'http://api.coindesk.com/v1/bpi/historical/close.json';

//Add graph on load
update();

//Query Selectors
let startInput = document.querySelector('#start-date');
let endInput = document.querySelector('#end-date');

//Event listeners
startInput.addEventListener('change', (e) => {
    start = startInput.value; 
    update();
});

endInput.addEventListener('change', (e) => {
    end = endInput.value;
    update();
})

//Update function 
function update(){
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
}

//Print chart function
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
                backgroundColor: '#FFFFFF',
                borderColor: '#0f6cff',
                data: values
            }],
        },
    });
}