// Function to dynamically load the Google Maps API script
function loadGoogleMapsScript(callback) {
    var script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0aYmPD5g24RZwav8_227sxXqqzGLlF7w&callback=${callback}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Function to initialize the map
function initMap() {
    // Center of the map (e.g., Los Angeles)
    var mapCenter = { lat: 34.0522, lng: -118.2437 };

    // Map styling to change colors
    var mapStyles = [
        {
            "featureType": "poi",  // Hide points of interest (POI)
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative",  // Hide administrative labels
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "transit",  // Hide public transit labels
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#525252" }] // Water color
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#333333" }] // Landscape color
        },
        {
            "featureType": "landscape.natural",  // Change vegetation color
            "elementType": "geometry",
            "stylers": [{ "color": "#333333" }] // Vegetation color
        },
        {
            "featureType": "landscape.park",  // Change park areas color
            "elementType": "geometry",
            "stylers": [{ "color": "#333333" }] // Park color
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#2b2b2b" }] // Road color
        },
        {
            "featureType": "road",  // Change street name labels color
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d0c2a4" }] // Street name color
        },
        {
            "featureType": "administrative.locality",  // Change city name labels color
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d0c2a4" }] // City name color
        }
    ];

    // Create the map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 18,
        styles: mapStyles // Apply styles to the map
    });

    // Address to create the marker for (e.g., Melrose Avenue, Los Angeles)
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': '1234 Melrose Avenue, Los Angeles, CA 90046' }, function(results, status) {
        if (status === 'OK') {
            // If the address is found, add the marker to the map
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: 'Delote-Beauty',
                // Customize the marker color using an icon
                icon: {
                    path: google.maps.SymbolPath.CIRCLE, // Use a circle as the base
                    scale: 20, // Marker size
                    fillColor: "#c9ab80", // Set fill color
                    fillOpacity: 1, // Fill opacity
                    strokeWeight: 2, // Border thickness
                    strokeColor: "#c9ab80" // Border color
                }
            });
            map.setCenter(results[0].geometry.location);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Load the Google Maps API and call initMap
loadGoogleMapsScript('initMap');
