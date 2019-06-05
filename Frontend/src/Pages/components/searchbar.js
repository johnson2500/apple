import React from 'react';
import {
  AppBar, Toolbar, Typography, Input,
} from '@material-ui/core';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.input = '';
    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged(e) {
    const query = e.target.value;
    const { inputHandler } = this.props;
    inputHandler({ query });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Apple Music Search Api
          </Typography>
          <div style={{ padding: 5, margin: 5 }}>
            <Input onChange={this.inputChanged} />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
