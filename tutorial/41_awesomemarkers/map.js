
$(document).ready(function() {

    // The first part of this is the same as what we've done before, but a little more concise...
    var DAYTON = [39.7589, -84.1916];
    var mymap = L.map('map').setView(DAYTON, 6);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    // Switching back to a featureGroup here
    var markerLayer = L.featureGroup();
    markerLayer.addTo(mymap);

    // Ok, now we have to get the data. We'll use jQuery here to make things
    // easier on us.
    $.get('skyline.oh.tsv', function(data) {

        // jQuery gives us back the data as a big string, so the first step
        // is to split on the newlines
        var lines = data.split('\n');
        var i, values;
        var len = lines.length;
        var locations = [];
        for (i = 0; i < len; i++) {
            // for each line, split on the tab character. The latitude and longitude
            // values are in the first and second positions respectively.
            values = lines[i].split('\t');

            // We have the header line of the tsv as well as the ending newline
            // to take care of.
            // Only keep lines that have a numeric value in the first and second
            // slots
            if (!isNaN(values[0]) && !isNaN(values[1])) {
                locations.push({
                    latitude: Number(values[0]),
                    longitude: Number(values[1]),
                    name: values[3],
                    address: values[5],
                    phone: values[6]
                });
            }
        }

        // infoTemplate is a string template for use with L.Util.template()
        var infoTemplate = '<h2>{name}</h2><p>{address}</p><p>{phone}</p>';

        // Ok, now we have an array of locations. We can now plot those on our map!
        len = locations.length;
        var location;
        for (i = 0; i < len; i++) {
            location = locations[i];

            // alternate between blue and red icons... in a real app, we
            // could pick a marker based on a data attribute
            var marker;
            if (i % 2 < 1) {
                marker = L.marker([location.latitude, location.longitude], {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'cutlery',
                        iconColor: 'yellow',
                        markerColor: 'red',
                        prefix: 'fa'
                    })
                });
            }
            else {
                marker = L.marker([location.latitude, location.longitude], {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'clock-o',
                        iconColor: 'yellow',
                        markerColor: 'blue',
                        prefix: 'fa'
                    })
                });
            }

            marker.addTo(markerLayer)
                .bindPopup(L.Util.template(infoTemplate, location));
        }

        // Now we can zoom the map to the extent of the markers
        mymap.fitBounds(markerLayer.getBounds());

    }); // $.get()
}); // document.ready()
