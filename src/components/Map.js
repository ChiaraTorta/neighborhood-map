import React, {Component} from "react";

export default class Map extends Component {
  render() {
    return (
      <main>
        <div
          id="map"
          aria-hidden="true"
          role="application"
          style={{height: "1000px"}}
        />
      </main>
    );
  }
}
