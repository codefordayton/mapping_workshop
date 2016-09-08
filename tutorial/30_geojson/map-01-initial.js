
$(document).ready(function() {

    // The first part of this is the same as what we've done before, but a little more concise...
    var DAYTON = [39.7589, -84.1916];
    var mymap = L.map('map').setView(DAYTON, 6);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);


    var countiesLayer = L.featureGroup();
    countiesLayer.addTo(mymap);

    // First, we need to load the GeoJSON file
    $.get('counties.oh.json', function(data) {

        // Since Leaflet already knows how to render GeoJSON, we won't have to
        // do any processing to the data.
        L.geoJson(data).addTo(countiesLayer);

        // We can still zoom to the extents of a layer by using our old
        // FeatureGroup layer trick
        mymap.fitBounds(countiesLayer.getBounds());
    }); // $.get()
}); // document.ready()
