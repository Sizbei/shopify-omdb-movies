import React, { Component } from "react";
import "../styling/Display.css";
import DisplayItem from "./DisplayItem";


class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Nominate",
      Nominations: [],
    };
  }

  render() {
    console.log(this.props.Movies);
    const MovieList = this.props.Movies.map((movie) => {
      
      return (
        <DisplayItem
          key={movie.imdbID}
          movie={movie}
          disabled={this.props.disabled}
          onNominate={this.props.onNominate}
        />
      );
    });
    return <div className="display-list-container">{MovieList}</div>;
  }
}

export default Display;