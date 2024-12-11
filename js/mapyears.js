mapboxgl.accessToken =
            'pk.eyJ1IjoieW91emlkb3VzaGkiLCJhIjoiY2xkZ21wcGRzMDBrajNubXRmdmJ0MnB2YSJ9.NvBSJcMyw5ArBpn2KhJl2A';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 3.0, // starting zoom
            center: [-90, 38] // starting center
        });

//define some variables       
        let currentYear = '2016'
        let years = ['2016','2017','2018', '2019', '2020', '2021', '2022', '2023']; // Add time-series years
        const colors=[
            'rgb(255,255,255)',
            'rgb(131,208,201)',
            'rgb(101,195,186)',
            'rgb(84,178,169)', 
            'rgb(53,167,156)', 
            'rgb(0,150,136)',
        ];
//load the map
        map.on('load', () => { 
            map.addSource('partinumber', {
                type: 'geojson',
                data: 'assets/partinumber.geojson'
            });

            map.addLayer({
                'id': 'polygon-2016',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2016'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'visible' // Keep the initial layer visible
    }
            });
            
            map.addLayer({
                'id': 'polygon-2017',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2017'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });
            
            map.addLayer({
                'id': 'polygon-2018',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2018'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });
            
            map.addLayer({
                'id': 'polygon-2019',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2019'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });
            
            map.addLayer({
                'id': 'polygon-2020',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2020'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });
            
            map.addLayer({
                'id': 'polygon-2021',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2021'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });
            
            map.addLayer({
                'id': 'polygon-2022',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2022'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });

            map.addLayer({
                'id': 'polygon-2023',
                'type': 'fill',
                'source': 'partinumber',
                'paint': {
                        'fill-color': [
                        'interpolate',
                ['linear'],
                ['get', '2023'],
                0, 'rgb(255,255,255)',
                10, 'rgb(131,208,201)',
                100, 'rgb(101,195,186)',
                600, 'rgb(84,178,169)',
                1200, 'rgb(53,167,156)',
                2000, 'rgb(0,150,136)'
            ],
            'fill-opacity': 0.6 // Adjust the transparency
        },
        'layout': {
        'visibility': 'none' // Hide other layers initially
    }
            });

 // create the toddle function
 var current_layer ='polygon-2016'
 const toggleableLayerIds = [
    'polygon-2016',
    'polygon-2017',
    'polygon-2018',
    'polygon-2019',
    'polygon-2020',
    'polygon-2021',
    'polygon-2022',
    'polygon-2023'
 ];

// Human-readable text for each layer
const id_text = {
    'polygon-2016':'year 2016',
    'polygon-2017':'year 2017',
    'polygon-2018':'year 2018',
    'polygon-2019':'year 2019',
    'polygon-2020':'year 2020',
    'polygon-2021':'year 2021',
    'polygon-2022':'year 2022',
    'polygon-2023':'year 2023'
};
// Dynamically create buttons for each layer
for (const id of toggleableLayerIds) {
    const link = document.createElement('button');
    link.id = id; // Use the layer ID as the button ID
    link.textContent = id_text[id]; // Set the button label
    link.className = 'inactive'; // Set default styling
    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

const visibility = map.getLayoutProperty(id, 'visibility');

console.log(`Checking visibility for layer: ${id}, Visibility: ${visibility}`); 
  // Hide all layers first
  toggleableLayerIds.forEach((layerId) => {
    map.setLayoutProperty(layerId, 'visibility', 'none');
    const button = document.getElementById(layerId);
    if (button) button.className = 'inactive'; // Reset all buttons
});

// Show the clicked layer
map.setLayoutProperty(id, 'visibility', 'visible');
this.className = 'active'; // Set the clicked button to active
};



// Add the button to the layer menu
const layersMenu = document.getElementById('layer_menu');
layersMenu.appendChild(link);
}

//--------------------------------------- create pupup function------------------------------------------------------
map.on('mouseenter', current_layer, (event) => {
    if (event.features.length > 0) {
        const feature = event.features[0];
        
        
        // Determine if the geometry is Polygon or MultiPolygon
        const geometry = feature.geometry;
        let coordinates;

        if (geometry.type === 'Polygon') {
            // Get the first coordinate of the Polygon
            coordinates = geometry.coordinates[0][0];
        } else if (geometry.type === 'MultiPolygon') {
            // Get the first coordinate of the first Polygon in the MultiPolygon
            coordinates = geometry.coordinates[0][0][0];
        }

        // Get the property for the popup
        const participantCount = feature.properties[currentYear];
        const name = feature.properties['name'];

        // Only create a popup if the property exists
        if (participantCount !== undefined && name) {
            const popup= new mapboxgl.Popup({
                closeButton: false, // No close button for hover popups
                closeOnClick: false // Do not close on map clicks
            })
            
                .setLngLat(coordinates)
                .setHTML(`<strong>Participants in ${name}(${currentYear}):</strong> ${participantCount}`)
                .addTo(map);
       //Save the popup instance so it can be removed later
       map.currentPopup =popup;
    }
    }
});

// Remove the popup on mouseleave
map.on('mouseleave', current_layer, () => {
    if (map.currentPopup) {
        map.currentPopup.remove(); // Remove the popup
        map.currentPopup = null; // Clear the reference
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