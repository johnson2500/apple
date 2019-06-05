import React from 'react';
import { Button } from '@material-ui/core';
import SearchBar from './components/searchbar';
import TableView from './components/tableview';
// import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [], // contains API data array
      favoritesItems: {}, // contains items from API call
      showFavorites: false, // used to toggle favorites section
      showSearchResult: true, // used to show search results section
    };
    this.saveFavorites = this.saveFavorites.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    const favoritesItems = JSON.parse(localStorage.getItem('ry-tune-favorites'));
    if (favoritesItems) {
      this.setState({ favoritesItems });
    } else {
      this.setState({ favoritesItems: {} });
    }
  }

  saveFavorites({ id, isFavorite, item }) {
    // add newest entry
    const { favoritesItems } = this.state;
    if (isFavorite) {
      const tempItem = {};
      tempItem[id] = item;
      this.setState({ favoritesItems: { ...favoritesItems, ...tempItem } });
    } else {
      // remove entry.
      const favoritesItemsCopy = { ...favoritesItems };
      delete favoritesItemsCopy[id];
      this.setState({ favoritesItems: favoritesItemsCopy });
    }
    // update local storage for eith delete or add
    localStorage.setItem('ry-tune-favorites', JSON.stringify(favoritesItems));
  }

  updateList(value) {
    const { query } = value;
    // remove empty query and add + between spaces
    const parsedQuery = query !== '' ? query.split(' ').join('+') : ' ';

    fetch(`http://localhost:8000/api/search?term=${parsedQuery}`)
      .then(data => data.json())
      .then((data) => {
        // if error do not show any tables console.log and display none
        if (!data || data.error) {
          this.setState({ ...this.state, tableData: {} });
          throw new Error(data.error);
        }
        this.setState({ ...this.state, tableData: data });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ ...this.state, tableData: {} });
      });
  }

  toggleView({ favorites, results }) {
    // toggle view
    if (favorites) {
      this.setState({
        showFavorites: favorites,
        showSearchResult: false,
      });
    } else {
      this.setState({
        showFavorites: false,
        showSearchResult: results,
      });
    }
  }

  showFavoritesView(favoritesItems = {}) {
    const favortiteKeys = favoritesItems ? Object.keys(favoritesItems) : [];
    const favoriteArray = [];

    favortiteKeys.forEach(key => favoriteArray.push({ ...favoritesItems[key], isFavorite: true }));

    return favoriteArray.length !== 0
      ? (
        <TableView
          saveFavorites={this.saveFavorites}
          tableData={favoriteArray}
          title="Your Favorites"
          favorites={favoritesItems}
        />
      )
      : <div>You have no favorites saved</div>;
  }

  showSearchResultsView(tableData) {
    const { favoritesItems } = this.state;
    const kindKeys = tableData ? Object.keys(tableData) : [];

    return kindKeys.length !== 0
      ? kindKeys.map(key => (
        <TableView
          saveFavorites={this.saveFavorites}
          tableData={tableData[key]}
          title={key}
          favorites={favoritesItems}
        />))
      : 'No data';
  }


  render() {
    const {
      tableData, favoritesItems, showSearchResult, showFavorites,
    } = this.state;
    return (
      <div>
        <SearchBar style={{ margin: 'auto' }} inputHandler={this.updateList} />
        <br />
        <Button color="primary" onClick={() => this.toggleView({ favorites: true })}>Show Favorites</Button>
        <Button color="primary" onClick={() => this.toggleView({ results: true })}>Show Results</Button>
        <br />
        {
          showFavorites
            ? this.showFavoritesView(favoritesItems)
            : <div />
        }
        <br />
        {
          showSearchResult
            ? this.showSearchResultsView(tableData)
            : <div />
        }
      </div>
    );
  }
}
