//load google package
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(loadCSV);

// Loads data  csv
function loadCSV() {
// Specify the path to your CSV file
    const csvFilePath = 'assets/Shpwithyear.csv';

// using library Papa Parse 
    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function (results) {
          const csvData = results.data;

// Extract required colums and prepare the data for the pie chart
    const chartData = [['Category', 'Value']];
        csvData.forEach(row => {
        chartData.push([row['name'], parseFloat(row['2023'])]);
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
        width: 300,  
        height: 200,
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