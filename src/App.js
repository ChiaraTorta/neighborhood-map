import React, {Component} from "react";
import "./App.css";
import Map from "./components/Map.js";
import {loadGoogleMaps, loadPlaces} from "./utils.js";

export default class App extends Component {
  state: {
    query: []
  };

  /*
   *  Function to inject third party data to the component and initialize component properties
   */
  componentDidMount() {
    let googleMapsPromise = loadGoogleMaps();
    let foursquarePromise = loadPlaces();

    Promise.all([googleMapsPromise, foursquarePromise]).then(values => {
      // get google object from promise resolve
      let google = values[0];
      // get venues from promise resolve and store them into props
      this.venues = values[1].response.groups[0].items;
      // store google object, map, markers and infowindow into props
      this.google = google;
      this.markers = [];
      this.infoWindow = new google.maps.InfoWindow();
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
            : marker.setAnimation(google.maps.Animation.BOUNCE) &&
              marker.setIcon(
                "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              );
          setTimeout(() => {
            marker.setAnimation(null);
          }, 1500);
        });

        // add infowindow to each marker
        google.maps.event.addListener(marker, "click", () => {
          this.infoWindow.setContent(marker.name);
          this.map.setCenter(marker.position);
          this.map.setZoom(15);
          this.infoWindow.open(this.map, marker);
        });

        this.markers.push(marker);
      });
      //show only copy of venues data source
      this.setState({filteredVanues: this.venues});
    });
  }

  /*
   *  Event handler for list item click
   */
  listItemClick = venue => {
    let marker = this.markers.filter(marker => marker.id === venue.venue.id);
    // open infowindow
    this.infoWindow.setContent(venue.venue.name);
    this.map.setCenter(venue.venue.location);
    this.map.setZoom(15);
    this.infoWindow.open(this.map, marker[0]);

    // add animation
    marker[0].getAnimation() !== null
      ? marker[0].setAnimation(null)
      : marker[0].setAnimation(this.google.maps.Animation.BOUNCE) &&
        marker[0].setIcon(
          "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        );
    setTimeout(() => {
      marker[0].setAnimation(null);
    }, 1500);
  };

  /*
   *  Function to filter list items depending on query
   */
  filterVenues(query) {
    let f = this.venues.filter(venue =>
      venue.venue.name.toLowerCase().includes(query)
    );
    // set map center to first filtered value
    f.length > 0 && this.map.setCenter(f[0].venue.location);
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query) === true
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
    // close infowindow if user type a query
    this.infoWindow.close();
    this.setState({filteredVanues: f, query});
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
              <div
                key={index}
                className="venue-item"
                onClick={() => {
                  this.listItemClick(venue);
                }}
              >
                {venue.venue.name}
              </div>
            ))}
        </div>
        <Map />
      </div>
    );
  }
}
