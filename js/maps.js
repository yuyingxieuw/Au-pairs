mapboxgl.accessToken =
            'pk.eyJ1IjoieW91emlkb3VzaGkiLCJhIjoiY2xkZ21wcGRzMDBrajNubXRmdmJ0MnB2YSJ9.NvBSJcMyw5ArBpn2KhJl2A';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 3.0, // starting zoom
            center: [-90, 38] // starting center
        });
        
        const grades = [10, 100, 200, 500, 1000],
        colors = ['rgb(235,209,256)', 'rgb(205,145,242)', 'rgb(161,53,237)', 'rgb(138,18,237)', 'rgb(84,9,149)', 'rgb(58,5,102)'],
        radii = [5, 10, 15, 20, 25];
        
        map.on('load', () => { 
            map.addSource('MapGeojson', {
                type: 'geojson',
                data: 'assets/MapGeojson.geojson'
            });

        map.addLayer({
                'id': 'polygon-layer',
                'type': 'fill',
                'source': 'MapGeojson',
                'paint': {
                    'fill-color': {
                        'property': 'All Stat_1', // Match property from your GeoJSON data
                        'stops': [
                            [10, 'rgb(235,209,256)'],
                            [100, 'rgb(205,145,242)'],
                            [200, 'rgb(161,53,237)'], 
                            [500, 'rgb(138,18,237)'], 
                            [1000, 'rgb(84,9,149)'],
                            [3000, 'rgb(58,5,102)']
                        ]
                    },
                    'fill-opacity': 0.6 // Adjust the transparency
                }
            });
            // click on tree to view magnitude in a popup
// create legend object, it will anchor to the div element with the id legend.
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<center><strong>Participants in each state</center></strong>'], vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radius = 4 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');

}

// combine all the html codes.
legend.innerHTML = labels.join('');


        });