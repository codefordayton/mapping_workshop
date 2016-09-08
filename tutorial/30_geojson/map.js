
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

    var bindPopup = function(feature, layer) {
        var countyTemplate = '<h2>{COUNTY_NAM}</h2><p>FIPS Code: {FIPS_CODE}</p><p>2000 Population: {POP_2000}</p>';
        layer.bindPopup(L.Util.template(countyTemplate, feature.properties));
    };

    // First, we need to load the GeoJSON file
    $.get('counties.oh.json', function(data) {

        // L.geoJSON takes a second argument for processing options. Here, we're
        // telling Leaflet to run our bindPopup function (defined above) on
        // each feature in the counties.oh.json geojson file.
        L.geoJson(data, {
            onEachFeature: bindPopup
        }).addTo(countiesLayer);

        // We can still zoom to the extents of a layer by using our old
        // FeatureGroup layer trick
        mymap.fitBounds(countiesLayer.getBounds());

    }); // $.get()
}); // document.ready()
