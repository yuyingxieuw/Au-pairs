//load google package
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(loadCSV);

// Loads data  csv
function loadCSV() {
// Specify the path to your CSV file
    const csvFilePath = './assest/Shpwithyear.csv';

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
        title: 'Au Pair Participants',
        width: 400,  
        height: 200,
         };
// Create and draw the pie chart
    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    }    