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
    const API_KEY = "AIzaSyBFit4u5ZOCR2xgFmub3W0bN8HC5t6xms8";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function loadPlaces() {
  let city = 'Turin';
  let query = 'Food';
  let clientId = "MB43T0UYDVLX4KHVEB4HCKB1X0J54YBZC1COCUOZA4X2XN2L";
  let clientSecret = "LLK1OIZNPRD0W3Q5NPIP0IKWMZBAVL3BNA3QKQO4ISKPSF2A";
  let apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815%20&limit=50&near=${city}&query=${query}`;
  return fetch(apiURL).then(resp => resp.json())
}
