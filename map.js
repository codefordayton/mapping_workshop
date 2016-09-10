// $(document).ready() is a jQuery function that delays executing the passed in
// JavaScript function until the browser has loaded all of the HTML.
$(document).ready(function() {

    // Coordinates for Dayton in an array formated as [latitude, longitude]
    var DAYTON = [39.7589, -84.1916];

    // This line tells leaflet where to render the map in the HTML, where to
    // center the map at (Dayton), and what zoom level to use.
    var mymap = L.map('map').setView(DAYTON, 6);

    // This is our base tile layer for our map. We'll talk about this more in
    // the next lesson.
    var tiles = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Add a layer to the map
    mymap.addLayer(tiles);
});
