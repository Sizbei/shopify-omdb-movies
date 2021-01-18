import React, { Component } from "react";
import Buttone from "./Buttons.js";
import "../styling/Nominations.css"

class Nominations extends Component {
  render() {
    const NominationList = this.props.Nominations.map((Nomination) => (
    
      <div className="nominations-item" key={Nomination.imdbID}>

        
        <div className="nominations-item-details">
      <div>
        <h3 className="">{Nomination.Title}</h3>
        <p>{Nomination.Year}</p>
      </div>

      <Buttone
        label="Remove"
        type="submit"
        onClick={(e) => this.props.removeNomination(e, Nomination)}
        className="btn delete"
        iconClass="fas fa-trash-alt"
      />
    </div>
      </div>
    ));
    return <div className={`nominations-container`}>{NominationList}</div>;
  }
}


export default Nominations;