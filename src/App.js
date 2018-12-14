import React, {Component} from "react";
// import "./App.css";
import Map from "./components/Map.js";
import {loadGoogleMaps, loadPlaces} from "./utils.js";

export default class App extends Component {
  componentDidMount() {
    let googleMapsPromise = loadGoogleMaps();
    let foursquarePromise = loadPlaces();

    Promise.all([googleMapsPromise, foursquarePromise]).then(values => {
      console.log(values);
      let google = values[0];
      // let venues = values[1].response.venues;
      let venues = values[1].response.groups[0].items;

      this.google = google;
      this.markers = [];
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        scrollwheel: true,
        center: {
          lat: venues[0].venue.location.lat,
          lng: venues[0].venue.location.lng
        }
      });

      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: {
            lat: venue.venue.location.lat,
            lng: venue.venue.location.lng
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
        <Map />
      </div>
    );
  }
}
