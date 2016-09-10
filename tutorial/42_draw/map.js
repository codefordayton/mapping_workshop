
$(document).ready(function() {

    // The first part of this is the same as what we've done before, but a little more concise...
    var DAYTON = [39.7589, -84.1916];
    var mymap = L.map('map').setView(DAYTON, 9);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    // This is a layer where we'll display what the user has drawn
    var drawLayer = L.featureGroup();
    mymap.addLayer(drawLayer);

    // Define a draw control to add to the map... only allowing the user to draw shapes
    var drawControl = new L.Control.Draw({
        draw: {
            polyline: false,
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#f00',
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                }
            },
            circle: true,
            rectangle: true,
            marker: false
        },
        edit: {
            featureGroup: drawLayer,
            remove: true
        }
    });
    mymap.addControl(drawControl);

    // When the user has drawn a shape, at a minimum, we want to add it to the
    // drawLayer. Here is also where you'd update a form input or send some
    // data to a backend server.
    mymap.on('draw:created', function (e) {
        var type = e.layerType;
        var layer = e.layer;

        drawLayer.addLayer(layer);

        var coords = layer._latlngs;
        console.log('User drew points: ' + JSON.stringify(coords));
    });

}); // document.ready()
