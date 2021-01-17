import React, { Component } from "react";
import "../styling/Search.css";

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
        {this.props.searchIco}
      </button>
       </form>


        
      </div>

      
    );
  }
}