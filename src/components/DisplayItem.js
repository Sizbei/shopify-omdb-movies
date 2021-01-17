import React from "react";
import Button from "./Buttons.js";

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
        <Button
          label={movie.label}
          type="submit"
          onClick={(e) => onNominate(e, movie)}
          className="btn nominate"
          iconClass="far fa-check-circle"
          disabled={movie.nominated}
        />
      </div>
    </div>
  );
}

export default DisplayItem;