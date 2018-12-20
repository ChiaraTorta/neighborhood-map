import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Sidebar extends Component {
  static propTypes = {
    filteredVenues: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };
  render() {
    const {filteredVenues, onClick} = this.props;
    return (
      <div id="list-items">
        {filteredVenues.length > 0 &&
          filteredVenues.map((venue, index) => (
            <div
              key={index}
              role="complementary"
              className="venue-item"
              onClick={() => {
                onClick(venue);
              }}
            >
              {venue.venue.name}
            </div>
          ))}
      </div>
    );
  }
}
