mapboxgl.accessToken =
            'pk.eyJ1IjoieW91emlkb3VzaGkiLCJhIjoiY2xkZ21wcGRzMDBrajNubXRmdmJ0MnB2YSJ9.NvBSJcMyw5ArBpn2KhJl2A';
        let map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 3.0, 
            center: [-90, 38] 
        });
        
        let currentYear = '2016'; // Start with the first year

        // define color array for legend
        const colors = [
            'rgb(255,255,255)',
            'rgb(131,208,201)',
            'rgb(101,195,186)',
            'rgb(84,178,169)', 
            'rgb(53,167,156)', 
            'rgb(0,150,136)',
        ];
       
        map.on('load', () => { 
            map.addSource('partinumber', {
                type: 'geojson',
                data: 'assets/simple.geojson'
            });

        map.addLayer({
                'id': 'polygon-layer',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                    'fill-color': {
                        'property': currentYear, // Match property from your GeoJSON data
                        'stops': [
                            [0, 'rgb(255,255,255)'],
                            [10, 'rgb(131,208,201)'],
                            [100, 'rgb(101,195,186)'],
                            [600, 'rgb(84,178,169)'], 
                            [1200, 'rgb(53,167,156)'], 
                            [2000, 'rgb(0,150,136)'],
                        ]
                    },
                    'fill-opacity': 0.6 // Adjust the transparency
                }
            });
     
// Add year button functionality
document.querySelectorAll('.layer_menu button').forEach(button => {
    button.addEventListener('click', function() {
        const year = this.getAttribute('data-year');
            updateMap (year);
    
    });
});        

// update popup and legend when years changes 
function updateMap(year) {
    currentYear = year;


    //update map layer
    map.setPaintProperty ('polygon-layer', 'fill-color', {
        'property': year,
        'stops': [
            [0, 'rgb(255,255,255)'],
            [10, 'rgb(131,208,201)'],
            [100, 'rgb(101,195,186)'],
            [600, 'rgb(84,178,169)'], 
            [1200, 'rgb(53,167,156)'], 
            [2000, 'rgb(0,150,136)'],   
        ]
    });

    // update legend title 
    const legendTitle = document.querySelector ('#legend div:first-child');
    if (legendTitle) {
        legendTitle.innerHTML = `<center><strong>Participants in each state (${year})</strong></center>`;
    }
}

// dynamic pop up function 
map.on('mousemove', 'polygon-layer', (event) => {
    if (map.currentPopup) map.currentPopup.remove();

    if (event.features.length > 0) {
        const feature = event.features[0];
        const participantCount = feature.properties[currentYear];
        const name = feature.properties['name'];
        

        // Use the mouse's position instead of polygon vertices
        const mouseLngLat = event.lngLat; 

        if (participantCount !== undefined && name) {
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            })
                .setLngLat(mouseLngLat) // Use mouse position
                .setHTML(`<strong>Participants in ${name}:</strong> ${participantCount}`)
                .addTo(map);

            map.currentPopup = popup;
        }
    }
});

map.on('mouseleave', 'polygon-layer', () => {
    if (map.currentPopup) {
        map.currentPopup.remove();
        map.currentPopup = null;
    }
});



// create legend object, it will anchor to the div element with the id legend.
const legend = document.getElementById('legend');

// Add legend title
const title = document.createElement('div');
title.innerHTML = '<center><strong>Participants in each state</strong></center>';
legend.appendChild(title);

const layers = [
    '0 - 10',
    '10 - 100',
    '100-600',
    '600 - 1200',
    '1200-2000',
    '2000 and more',
];



// Iterate through layers and create a legend item for each
layers.forEach((layer, i) => {
    const color = colors[i];
    
    // Create container for each legend item
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.marginBottom = '4px';
    
    // Create the color key
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
    key.style.width = '20px';
    key.style.height = '20px';
    key.style.display = 'inline-block';
    key.style.marginRight = '8px';
    
    // Add the label
    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    
    // Combine key and label
    item.appendChild(key);
    item.appendChild(value);
    
    // Append item to the legend
    legend.appendChild(item);
});

        });