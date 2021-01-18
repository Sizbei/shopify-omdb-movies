import React, { Component } from "react";
import "../styling/Search.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <form onSubmit={this.props.onSubmit}>
      <input
        value={this.props.value}
        onChange={this.props.onChange}
        type="search"
        placeholder="Enter movie title"
      />
      <button type="submit" className="search-button">
      <FontAwesomeIcon icon={faSearch} />
      </button>
       </form>


        
      </div>

      
    );
  }
}