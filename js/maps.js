function loadMap1() {
    var map = L.map('map', {
      maxZoom: 14,
      minZoom: 10,
    }).setView([47.612833, -122.331739], 12.5);
  
    var tile1 = L.tileLayer('../assets/chargingStation/{z}/{x}/{y}.png', {
      attribution: 'Charging Station Map',
      detectRetina: true
    });
  
    var baseLayers = {
      "Charging Stations": tile1
    };
  
    L.control.layers(baseLayers, null, {
      collapsed: false,
      position: 'topright'
    }).addTo(map);
  }
  
  function loadMap2() {
    var tile2 = L.tileLayer('assets/tile2_data/{z}/{x}/{y}.png', {
      attribution: 'Public parks within King County',
      detectRetina: true
    });
    
    var baseLayers = {
      'Grayscale': grayscale
    };
    
    var overlays = {
      "Public parks within King County": tile2
    }
    
    L.control.layers(baseLayers, overlays, {
      collapsed: false,
      position: 'topright'
    }).addTo(map);
  }
  
  function loadMap3() {
    var tile3 = L.tileLayer('assets/tile3_basemap_data/{z}/{x}/{y}.png', {
      attribution: 'Basemap and Data',
      detectRetina: true
    });
}
   