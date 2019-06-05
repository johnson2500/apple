import React from 'react';
import {
  Favorite,
  FaceOutlined,
} from '@material-ui/icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { isFavorite } = this.props;
    this.state = {
      isFavorite: isFavorite || false,
    };
    this.setFavorite = this.setFavorite.bind(this);
  }

  setFavorite() {
    // call parent function
    const { id, item, saveFavorites } = this.props;
    const { isFavorite } = this.state;
    // save favorites in parent element
    saveFavorites({ id, isFavorite: !isFavorite, item });
    // set state for icon change
    this.setState({ isFavorite: !isFavorite });
  }

  render() {
    const { isFavorite } = this.state;
    return (
      <div position="static">
        {
          isFavorite
            ? <Favorite onClick={() => this.setFavorite()} />
            : <FaceOutlined onClick={() => this.setFavorite()} />
        }
      </div>
    );
  }
}
