import React, {Component} from "react";
// import "./App.css";
// import Map from "./components/Map.js";
import {loadGoogleMaps, loadPlaces} from "./utils.js";

export default class App extends Component {
  componentDidMount() {
    let googleMapsPromise = loadGoogleMaps();
    let foursquarePromise = loadPlaces();

    Promise.all([googleMapsPromise, foursquarePromise]).then(values => {
      console.log(values);
      let google = values[0];
      let venues = values[1].response.venues;

      this.google = google;
      this.markers = [];
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        scrollwheel: true,
        center: {
          lat: venues[0].location.lat,
          lng: venues[0].location.lng
        }
      });

      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: {
            lat: venue.location.lat,
            lng: venue.location.lng
          },
          map: this.map,
          animation: google.maps.Animation.DROP,
          //custom parameters
          name: venue.name,
          id: venue.id
        });
        this.markers.push(marker);
      });
    });
  }
  render() {
    return (
      <div>
        <main>
          <div id="map" role="application" style={{height: "1000px"}} />
        </main>
      </div>
    );
  }
}
