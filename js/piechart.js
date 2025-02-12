// global var
let currentYearpie = '2023';
function selectView(year){
    currentYearpie = year;
    document.getElementById('pie_selector'. innerHTML = year);
        loadCSV (year);
}

//load google package
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(() => loadCSV(currentYear));

// Loads data  csv
function loadCSV(selectedYear = '2023') {
// Specify the path to your CSV file
    const csvFilePath = 'assets/Shpwithyear.csv';

// using library Papa Parse 
    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function (results) {
          const csvData = results.data;
          

// Extract required colums and prepare the data for the pie chart
const chartData = [['State', 'Participants']];
        
csvData.forEach(row => {
    if (row[selectedYear]) {
        chartData.push([row['name'], parseFloat(row[selectedYear])]);
    }
    });

//Pass the prepared data to the drawChart function
    drawChart(chartData)
                },
    error: function (error) {
        console.error('Error parsing CSV file:', error);
        }
        });
        }

function drawChart(chartData) {
    // Convert array data to Google Charts DataTable
    const data = google.visualization.arrayToDataTable(chartData);

// Define chart options
    const options = {
        width: 250,  
        height: 180,
        top: 0,
        bottom:0,
        chartArea: {
            left: 5, // Adjust chart's left padding
            top: 5, // Adjust chart's top padding
            bottom: 0,
            width: '100%', // Adjust the width of the chart area
            height: '100%' // Adjust the height of the chart area
          },
         };
// Create and draw the pie chart
    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    }    