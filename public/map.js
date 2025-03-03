// Define the initMap function globally
function initMap(lat, lng) {
    // Ensure the coordinates are valid
    if (isNaN(lat) || isNaN(lng)) {
        console.error("Invalid coordinates:", lat, lng);
        return;
    }

    // Create the map centered at the user's location
    const userLocation = { lat: lat, lng: lng };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: userLocation
    });

    // Create a marker at the user's location using AdvancedMarkerElement (recommended)
    const marker = new google.maps.marker.AdvancedMarkerElement({
        position: userLocation,
        map: map,
        title: "You are here"
    });
}

// Request geolocation permission and initialize the map
function getPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Position:", position);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Check if coordinates are valid numbers
                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid coordinates received:", lat, lng);
                    document.getElementById("map").innerHTML = "Unable to retrieve valid coordinates.";
                } else {
                    initMap(lat, lng); // Call initMap with valid coordinates
                }
            },
            (error) => {
                console.error("Error occurred: ", error.message);
                document.getElementById("map").innerHTML = "Geolocation permission denied or failed. Please allow access to location.";
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        document.getElementById("map").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Trigger geolocation permission request
getPermission();
