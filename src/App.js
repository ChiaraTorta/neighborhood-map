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
      // get google object from promise resolve
      let google = values[0];
      // get venues from promise resolve
      this.venues = values[1].response.groups[0].items;
      this.google = google;
      this.markers = [];
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        scrollwheel: true,
        center: {
          lat: this.venues[0].venue.location.lat,
          lng: this.venues[0].venue.location.lng
        }
      });

      // add marker to each venue
      this.venues.forEach(venue => {
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

        // add event listener to each marker
        google.maps.event.addListener(marker, "click", () => {
          marker.getAnimation() !== null
            ? marker.setAnimation(null)
            : marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 1500);
        });

        this.markers.push(marker);
      });
      //show only copy of venues data source
      this.setState({filteredVanues: this.venues});
    });
  }

  filterVenues(query) {
    let f = this.venues.filter(venue =>
      venue.venue.name.toLowerCase().includes(query)
    );
    this.setState({filteredVanues: f});

    console.log(this.state.filteredVenues);
    console.log(f);
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query) === true
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
    this.setState({query: query});
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
          <br />
          {this.state !== null &&
            this.state.filteredVanues.length > 0 &&
            this.state.filteredVanues.map((venue, index) => (
              <div key={index} className="venue-item">
                {venue.venue.name}
              </div>
            ))}
        </div>
        <Map />
      </div>
    );
  }
}
