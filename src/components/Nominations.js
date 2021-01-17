import React, { Component } from "react";
import Button from "./Buttons.js";

class Nominations extends Component {
  render() {
    const NominationList = this.props.Nominations.map((Nomination) => (
      <div className="nomination-item" key={Nomination.imdbID}>
        <div className="nomination-item-details">
      <div>
        <h3 className="">{Nomination.Title}</h3>
        <p>{Nomination.Year}</p>
      </div>

      <Button
        label="Remove"
        type="submit"
        onClick={this.props.removeNomination}
        className="btn delete"
        iconClass="fas fa-trash-alt"
      />
    </div>
      </div>
    ));
    return <div className={`nomination-container`}>{NominationList}</div>;
  }
}

export default Nominations;