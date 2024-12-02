google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    VarDate = google.visualization.arrayToDataTable([
        ['Year' ,'Participants','Visa Sponsors'],
        ['2016',19233,17],
        ['2017',20353,17],
        ['2018',20678,430],
        ['2019',21551,419],
        ['2020',7107,340],
        ['2021',16454,412],
        ['2022',21449,423],
    ]);
    var options = {
        title: 'Au Pair Participants and Visa Sponsors',
        curveType: 'function',
        legend: { position: 'top' },
        width: 500,  
        height: 300
      };
    
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
      chart.draw(data, options);
}