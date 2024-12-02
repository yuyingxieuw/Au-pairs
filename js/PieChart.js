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
    const chartData


    // Creates the pie chart
    var summary = c3.generate({
        bindto: '#chart',
        data: {
            rows: [
                Country,
                Exports
            ],
            type: 'pie',
            labels: true,
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        
        // Creates label to show number of exports for each countries when hovered
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    return `${value} Exports`;
                }
            }
        },

        legend: {
            show: false
        }
    });

}


function selectView(selection) {
    var elem = document.getElementById("pie_selector");
    if (elem.innerHTML != selection) {
        elem.innerHTML = selection;
        parseData(selection, createGraph);
    }
}


parseData("Country", createGraph);