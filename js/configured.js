// mapbox-config.js
mapboxgl.accessToken = 'pk.eyJ1IjoieW91emlkb3VzaGkiLCJhIjoiY2xkZ21wcGRzMDBrajNubXRmdmJ0MnB2YSJ9.NvBSJcMyw5ArBpn2KhJl2A';

// Configuration constants
const GRADES = [0, 10, 100, 600, 1200, 2000];
const COLORS = [
    'rgb(255,255,255)',
    'rgb(131,208,201)',
    'rgb(101,195,186)',
    'rgb(84,178,169)', 
    'rgb(53,167,156)', 
    'rgb(0,150,136)'
];
const RADII = [5, 15, 20, 25, 30, 43];

// Map state management
let currentMapType = 'dot';
let currentYear = '2016';
let map = null;

// Initialize the map
function initializeMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-93, 38],
        zoom: 3.3
    });

    // Load initial map type
    map.on('load', () => {
        loadMapType(currentMapType);
        setupYearControls();
        setupMapTypeControls();
    });
}

// Map type loader
function loadMapType(type) {
    // Clear existing layers and sources
    if (map.getLayer('dot-layer')) map.removeLayer('dot-layer');
    if (map.getLayer('polygon-layer')) map.removeLayer('polygon-layer');
    if (map.getSource('centroid')) map.removeSource('centroid');
    if (map.getSource('polygons')) map.removeSource('polygons');

    // Add appropriate sources and layers
    if (type === 'dot') {
        map.addSource('centroid', {
            type: 'geojson',
            data: 'assets/centroid.geojson'
        });

        map.addLayer({
            id: 'dot-layer',
            type: 'circle',
            source: 'centroid',
            paint: {
                'circle-radius': {
                    property: currentYear,
                    stops: GRADES.map((grade, i) => [grade, RADII[i]])
                },
                'circle-color': {
                    property: currentYear,
                    stops: GRADES.map((grade, i) => [grade, COLORS[i]])
                },
                'circle-opacity': 0.6,
                'circle-stroke-color': 'white'
            }
        });

        setupDotInteractions();
    } else {
        map.addSource('polygons', {
            type: 'geojson',
            data: 'assets/simple.geojson'
        });

        map.addLayer({
            id: 'polygon-layer',
            type: 'fill',
            source: 'polygons',
            paint: {
                'fill-color': {
                    property: currentYear,
                    stops: GRADES.map((grade, i) => [grade, COLORS[i]])
                },
                'fill-opacity': 0.6
            }
        });

        setupPolygonInteractions();
    }

    updateLegend(type);
    updateYear(currentYear);
}

// Year update handler
function updateYear(year) {
    currentYear = year;
    
    if (currentMapType === 'dot') {
        map.setPaintProperty('dot-layer', 'circle-radius', {
            property: year,
            stops: GRADES.map((grade, i) => [grade, RADII[i]])
        });
        map.setPaintProperty('dot-layer', 'circle-color', {
            property: year,
            stops: GRADES.map((grade, i) => [grade, COLORS[i]])
        });
    } else {
        map.setPaintProperty('polygon-layer', 'fill-color', {
            property: year,
            stops: GRADES.map((grade, i) => [grade, COLORS[i]])
        });
    }
    
    updateLegend(currentMapType);
}

// Legend management
function updateLegend(type) {
    const legend = document.getElementById('legend');
    legend.innerHTML = `
        <div><center><strong>Participants in each state (${currentYear})</strong></center></div>
        ${type === 'dot' ? generateDotLegend() : generateChoroplethLegend()}
    `;
}

function generateDotLegend() {
    return GRADES.map((grade, i) => `
        <div class="legend-item">
            <div class="legend-dot" style="
                width: ${RADII[i] }px;
                height: ${RADII[i] }px;
                background: ${COLORS[i]};
                border: 2px solid white;
                border-radius: 50%;
                margin-right: 8px;">
            </div>
            <span>${i === GRADES.length - 1 ? `${grade}+` : `${grade} - ${GRADES[i + 1]}`}</span>
        </div>
    `).join('');
}

function generateChoroplethLegend() {
    return GRADES.map((grade, i) => `
        <div class="legend-item">
            <div class="legend-color" style="
                width: 20px;
                height: 20px;
                background: ${COLORS[i]};
                margin-right: 8px;">
            </div>
            <span>${i === GRADES.length - 1 ? `${grade}+` : `${grade} - ${GRADES[i + 1]}`}</span>
        </div>
    `).join('');
}

// Control setup
function setupYearControls() {
    document.querySelectorAll('.layer_menu button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.layer_menu button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateYear(this.dataset.year);
        });
    });
}

function setupMapTypeControls() {
    document.querySelectorAll('.map_style button').forEach((button, index) => {
        button.addEventListener('click', function() {
            const type = index === 0 ? 'dot' : 'choropleth';
            if (type === currentMapType) return;
            
            document.querySelectorAll('.map_style button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMapType = type;
            loadMapType(type);
        });
    });
}

// Interaction handlers
function setupDotInteractions() {
    map.on('mousemove', 'dot-layer', (e) => handlePopup(e, 'dot-layer'));
    map.on('mouseleave', 'dot-layer', clearPopup);
}

function setupPolygonInteractions() {
    map.on('mousemove', 'polygon-layer', (e) => handlePopup(e, 'polygon-layer'));
    map.on('mouseleave', 'polygon-layer', clearPopup);
}

// pop up function
function handlePopup(event, layerId) {
    if (map.currentPopup) map.currentPopup.remove();
    
    const feature = event.features[0];
    if (feature) {
        const popup = new mapboxgl.Popup()
            .setLngLat(event.lngLat)
            .setHTML(`
                <strong>Participants in ${feature.properties.name}:</strong>
                ${feature.properties[currentYear]}
            `)
            .addTo(map);
        map.currentPopup = popup;
    }
}

function clearPopup() {
    if (map.currentPopup) {
        map.currentPopup.remove();
        map.currentPopup = null;
    }
}

// Initialize the application
initializeMap();