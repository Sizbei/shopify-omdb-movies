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
    const MovieList = this.props.Movies.map((movie) => {
        if (movie.Poster === "N/A") {
            movie.Poster =
              "https://wikiclipart.com/wp-content/uploads/2016/10/Movie-night-clipart-free-images-4.jpeg";
          }
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