function requestLocationPermission() {
    
    if (navigator.geolocation) {
        console.log("Checking for geolocation support...");
        navigator.geolocation.watchPosition(
            (position) => {
                console.log("Location access granted!");
                console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
                // Proceed with your functionality, e.g., show nearby venues
            },
            (error) => {
                console.error("Location access denied or unavailable:", error.message);
            }
        );
    } else {
        console.error("Geolocation not supported by this browser.");
    }
}

// Call the function when the page loads
window.onload = function() {
    requestLocationPermission();
};
console.log("Checking for geolocation support...");