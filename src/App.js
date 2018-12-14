import React, {Component} from "react";
import "./App.css";
import Map from "./components/Map.js";
import {loadGoogleMaps, loadPlaces} from "./utils.js";

export default class App extends Component {
  state: {
    query: []
  };
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
          name: venue.venue.name,
          id: venue.venue.id
        });
        this.markers.push(marker);
      });
    });
  }

  filterVenues(query) {
    if (query) {
      this.markers.forEach(marker => {
        marker.name.toLowerCase().includes(query) === true
          ? marker.setVisible(true)
          : marker.setVisible(false);
      });
      this.setState({query});
    }
  }
  render() {
    return (
      <div>
        <div id="sidebar">
          <input
            onChange={e => {
              this.filterVenues(e.target.value);
            }}
          />
        </div>
        <Map />
      </div>
    );
  }
}
