mapboxgl.accessToken =
            'pk.eyJ1IjoieW91emlkb3VzaGkiLCJhIjoiY2xkZ21wcGRzMDBrajNubXRmdmJ0MnB2YSJ9.NvBSJcMyw5ArBpn2KhJl2A';
        let map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 3.5, 
            center: [-90, 38] 
        });
        
        let currentYear = '2016'; // Start with the first year

        // define color array for legend
        const grades =  [0, 10, 100, 600, 1200, 2000]
        const colors = [
            'rgb(255,255,255)',
            'rgb(131,208,201)',
            'rgb(101,195,186)',
            'rgb(84,178,169)', 
            'rgb(53,167,156)', 
            'rgb(0,150,136)',
        ]
        const radii = [5, 15, 20, 25, 30, 43]
       
        map.on('load', () => { 
            map.addSource('centroid', {
                type: 'geojson',
                data: 'assets/centroid.geojson'
            });

        map.addLayer({
                'id': 'dot-layer',
                'type': 'circle',
                'source': 'centroid',
                'paint': {
                    'circle-radius': {
                        'property': currentYear, // Match property from your GeoJSON data
                        'stops': [
                            [grades[0], radii[0]],
                            [grades[1], radii[1]],
                            [grades[2], radii[2]], 
                            [grades[3], radii[3]], 
                            [grades[4], radii[4]],
                            [grades[5], radii[5]]
                        ]
                    },
                    'circle-color':{
                        'property': currentYear,
                        'stops': [
                            [grades[0], colors[0]],
                            [grades[1], colors[1]],
                            [grades[2], colors[2]], 
                            [grades[3], colors[3]], 
                            [grades[4], colors[4]],
                            [grades[5], colors[5]]
                        ]
                    },
                    'circle-opacity': 0.6, 
                    'circle-stroke-color': 'white',
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
    map.setPaintProperty ('dot-layer', 'circle-radius', {
        'property': year,
        'stops': [
            [grades[0], radii[0]],
            [grades[1], radii[1]],
            [grades[2], radii[2]],
            [grades[3], radii[3]],
            [grades[4], radii[4]],
            [grades[5], radii[5]]
        ]
    });

    map.setPaintProperty('dot-layer', 'circle-color', {
        'property': year,
        'stops': [
            [grades[0], colors[0]],
            [grades[1], colors[1]],
            [grades[2], colors[2]],
            [grades[3], colors[3]],
            [grades[4], colors[4]],
            [grades[5], colors[5]]
        ]
    });

    // update legend title 
    const legendTitle = document.querySelector ('#legend div:first-child');
    if (legendTitle) {
        legendTitle.innerHTML = `<center><strong>Participants in each state (${year})</strong></center>`;
    }
}

// dynamic pop up function 
map.on('mousemove', 'dot-layer', (event) => {
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

map.on('mouseleave', 'dot-layer', () => {
    if (map.currentPopup) {
        map.currentPopup.remove();
        map.currentPopup = null;
    }
});

// Create legend after map loads
const legend = document.getElementById('legend');
legend.innerHTML = '';

const title = document.createElement('div');
title.innerHTML = `<center><strong>Participants in each state (${currentYear})</strong></center>`;
legend.appendChild(title);

// Generate dynamic labels
const layers = [];
for (let i = 0; i < grades.length; i++) {
    layers.push(i === grades.length - 1 ? 
        `${grades[i]}+` : 
        `${grades[i]} - ${grades[i + 1]}`);
}

// Create legend items
layers.forEach((label, i) => {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.margin = '5px 0';

    const dot = document.createElement('div');
    dot.style.width = `${radii[i] * 2}px`;
    dot.style.height = `${radii[i] * 2}px`;
    dot.style.background = colors[i];
    dot.style.borderRadius = '50%';
    dot.style.marginRight = '10px';
    dot.style.border = '2px solid #fff';

    const text = document.createElement('span');
    text.textContent = label;
    text.style.fontSize = '0.8em';

    item.appendChild(dot);
    item.appendChild(text);
    legend.appendChild(item);
});

        });