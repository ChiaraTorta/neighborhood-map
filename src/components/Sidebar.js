import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Sidebar extends Component {
  static propTypes = {
    filteredVenues: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };
  render() {
    // const {filteredVenues, listItemClick} = this.props;
    return (
      <div id="list-items">
        {this.props.filteredVenues.length > 0 &&
          this.props.filteredVenues.map((venue, index) => (
            <div
              key={index}
              className="venue-item"
              onClick={() => {
                this.props.onClick(venue);
              }}
            >
              {venue.venue.name}
            </div>
          ))}
      </div>
    );
  }
}
