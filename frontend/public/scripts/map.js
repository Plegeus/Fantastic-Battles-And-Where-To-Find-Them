
var southWest = L.latLng(-90, -180),
              northEast = L.latLng(90, 180),
              bounds = L.latLngBounds(southWest, northEast);
          var map = L.map('center_pane', {maxBounds: bounds}).setView([25,0], 3);
          map.options.minZoom = 2;

          L.tileLayer('https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=v21B0xhC8tSTZGn1gUwV',{
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          }).addTo(map);
          // add marker
          L.marker([50.5, -0.09]).addTo(map)
              .bindPopup('Battle')
              .openPopup();
          // add map scale
          L.control.scale().addTo(map) 

          var mayAdd = false;
          var currentMarker;
          function showAddScreen() {
            var pane = document.getElementById("add_battle_pane");
            if (pane.style.display == 'block'){
              pane.style.display = 'none';
              mayAdd = false;
            }else {
              pane.style.display = 'block';
              mayAdd = true;
            }
          } 
          map.on('click', function(e){
            var pane = document.getElementById("add_battle_pane");
            const form = document.querySelector('form');
            if (mayAdd){
            //document.getElementById("coordinate").innerHTML = e.latlng;
            currentMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
                        .bindPopup("Name:" + form.elements["name"].value + " - Victor:" + form.elements["victor"].value + " - Vanquished:" + form.elements["vanquished"].value + " - Victorious Commander:" + form.elements["victorious_commander"].value + " - Vanquished Commander:" + form.elements["vanquished_commander"].value + " - Victorious Deaths:" + form.elements["victorious_deaths"].value + " - Vanquished Deaths: " + form.elements["vanquished_deaths"].value)
                        .openPopup();
            mayAdd = false;
            pane.style.display = 'none';
            const inputs = document.querySelectorAll('#name, #victor, #vanquished, #victorious_commander, #vanquished_commander, #victorious_deaths, #vanquished_deaths');
            inputs.forEach(input => {
              input.value = '';
            });

            }
          })

          