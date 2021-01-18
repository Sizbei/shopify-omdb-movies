import Header from './components/Header.js';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import "./App.css";
import Display from "./components/Display";
import Search from "./components/Search";
import Nominations from "./components/Nominations";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Alert } from "shards-react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      active1: "tabs-item active",
      active2: "tabs-item",
      searchQuery: "",
      Movies: [],
      Nominations: [],
      Max: false,
     
    };
    this.tabIndex = React.createRef();
  }

  componentDidMount() {
    this._retrieveNominationsFromStorage();

    this.handleSearchSubmit = async (e) => {
      e.preventDefault();

      if (this.state.searchQuery) {
        this.setState({
         
          selectedIndex: 0,
        });

        const Response = await this.getMoviesFromOMDB();

        if (Response.Response === "True") {
          const MoviesList = Response.Search;

          MoviesList.forEach(function (movie) {
            movie.nominated = false;
            movie.label = "Nominate";
          });

          titlesAreSame(MoviesList, this.state.Nominations);
          this._disableNominationButtons(MoviesList);

          this.setState({
            Movies: MoviesList,
          });
        } else if (Response.Response === "False") {
          createNotification('error')

          
        }
      } else {
        createNotification('error')
      }
    };

    this.getMoviesFromOMDB = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=281d4422`
      );
      const responseJSON = await response.json();

      return responseJSON;
    };
  }


  
  handleSelect = (index) => {
    this.setState({ selectedIndex: index });
  };

  _retrieveNominationsFromStorage = () => {
    const storedNominations = JSON.parse(
      localStorage.getItem("shopify-movie-app")
    );

    if (storedNominations !== null) {
      this.setState({
        Nominations: storedNominations,
        active1: "tabs-item active",
      });
    }
  };

  //save nominations
  _saveToLocalStorage = (list) => {
    localStorage.setItem("shopify-movie-app", JSON.stringify(list));
  };

  //switch tabs
  handleTabActiveness = (e) => {
    if (e.target.tabIndex === 1) {
      this.setState({
        active1: "tabs-item active",
        active2: "tabs-item",
      });
    } else if (e.target.tabIndex === 2) {
      this.setState({
        active1: "tabs-item",
        active2: "tabs-item active",
      });
    }
  };

  //add nominations to Nomination list
  handleNomination = (e, movie) => {
    const Movies = this.state.Movies;
    Movies.map((movieItem) => {
      if (movie.imdbID === movieItem.imdbID) {
        movieItem.nominated = true;
        movieItem.label = "Nominated";
      }
      return movieItem;
    });

    //Disable nomination buttons after five nominations
    const NominationList = [...this.state.Nominations, movie];
    if (NominationList.length >= 5) {
      createNotification("warning"); 
      
      this.setState({
        Max: true,
      });
      console.log("hi");

      const newMovies = this.state.Movies;
      newMovies.map((movie) => {
        movie.nominated = true;
        
        if (movie.label === "Nominate") {
          movie.label = "Can't Nominate";
        }
        return movie;
      });

      this.setState({
        Movies: newMovies,
      });
    }

    this.setState({
      Nominations: NominationList,
      Movies: Movies,
    });

    this._saveToLocalStorage(NominationList);
  };

  removeNomination = (e, nominated) => {
    const newNominationList = this.state.Nominations;
    let updateMoviesList = this.state.Movies;

    const newNominations = newNominationList.filter(
      (nomination) => nomination.Title !== nominated.Title
    );

    updateMoviesList.map((movieItem) => {
      if (nominated.imdbID === movieItem.imdbID) {
        movieItem.nominated = false;
        movieItem.label = "Nominate";
      }
      return movieItem;
    });

    
    updateMoviesList = restoreNominationStatus(
      updateMoviesList,
      newNominations
    );
    this._saveToLocalStorage(newNominations);

    this.setState({
      Nominations: newNominations,
      Movies: updateMoviesList,
      Max: false,
    });
  };

  _disableNominationButtons(MoviesList) {
    if (this.state.Nominations.length >= 5) {
      MoviesList.map((movie) => {
        movie.nominated = true;
        if (movie.label === "Nominate") {
          movie.label = "Can't Nominate";
        }
        return movie;
      });
    }
  }

  render() {
    return (
      <div className="App">
       
          <div className="body">
            
            <Header theme={"dark"}></Header>
            <Alert className="mb-3" open={this.state.Max} theme="warning">
         Alert {"max number of nominations reached"}
       </Alert>
            
            <Search
              value={this.state.searchQuery}
              onSubmit={(e) => this.handleSearchSubmit(e)}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
              
            ></Search>
          </div>
      
        <NotificationContainer/>

        <Tabs
          selectedIndex={this.state.selectedIndex}
          onSelect={this.handleSelect}
        >
          <TabList className="tabs-container">
            <Tab
              className={`${this.state.active1}`}
              onClick={this.handleTabActiveness}
              tabIndex="1"
              onSelect={this.handleSelect}
            >
              Movies
            </Tab>
            <Tab
              className={`${this.state.active2}`}
              onClick={this.handleTabActiveness}
              tabIndex="2"
              onSelect={this.handleSelect}
            >
              Nominations
              
            </Tab>
          </TabList>
          <main className="main-container">
            <TabPanel>
              {this.state.Movies.length ? (
                <Display
                  Movies={this.state.Movies}
                  onNominate={this.handleNomination}
                />
              ) : (
                <p className="empty-movie-list">{this.state.emptyMovieList}</p>
              )}
            </TabPanel>
            <TabPanel>
              {this.state.Nominations.length ? (
                <Nominations
                  Nominations={this.state.Nominations}
                  removeNomination={this.removeNomination}
                />
              ) : (
                <p className="empty-nomination-list">
                  {this.state.emptyNominationList}
                </p>
              )}
            </TabPanel>
          </main>
        </Tabs>
        
        
      </div>
    );
  }
}

// checks for dupes
const titlesAreSame = (moviesList, nominationList) => {
  const Nominations = nominationList;
  for (let nominated in Nominations) {
    for (let Title in moviesList) {
      if (moviesList[Title].Title === Nominations[nominated].Title) {
        moviesList[Title].nominated = true;
        moviesList[Title].label = "Nominated";
      }
    }
  }
};

//unnominates movie
const restoreNominationStatus = (moviesList, nominationList) => {
  for (let nomination in nominationList) {
    for (let Title in moviesList) {
      if (moviesList[Title].label === "Nominated") {
        continue;
      } else if (
        moviesList[Title].label === "Nominate" ||
        moviesList[Title].label === "Can't Nominate"
      ) {
        moviesList[Title].nominated = false;
        moviesList[Title].label = "Nominate";
        console.log(nomination);
      }
    }
  }
  return moviesList;
};

const createNotification = (type) => {
  return () => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        alert('callback');
        break;

    }
  };
};

export default App;
