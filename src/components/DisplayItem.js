import React from "react";
import Buttone from "./Buttons.js";

function DisplayItem({ movie, onNominate }) {
  return (
    <div className="display-item">
      <div className="image-container">
        <img src={movie.Poster} alt="Movie Poster" />
      </div>
      <div className="title-container">
        <h3>{movie.Title}</h3>
        <p>({movie.Year})</p>
      </div>
      <div className="display-content-container">
        <Buttone
          label={movie.label}
          type="submit"
          onClick={(e) => onNominate(e, movie)}
          className="btn nominate"
          disabled={movie.nominated}
        />
      </div>
    </div>
  );
}

export default DisplayItem;