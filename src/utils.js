export function loadGoogleMaps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = "YOUR API";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function loadPlaces() {
  let latLng = "48.763441,9.271830";
  let clientId = "YOUR CLIENT-ID";
  let clientSecret = "YOUR CLIENT-SERVICE";
  let apiURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=50&ll=${latLng}&query=coffee`;
  return fetch(apiURL).then(resp => resp.json());
}
