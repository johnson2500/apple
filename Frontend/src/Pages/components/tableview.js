import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@material-ui/core';

import FavoriteIcon from './favorites';

export default class TableView extends React.Component {
  getRows(rows) {
    const { saveFavorites } = this.props;
    return rows.length === 0
      ? <Typography>No Data Found.</Typography>
      : rows.map(row => (
        <TableRow key={row.previewUrl}>
          <TableCell align="center">
            <a href={row.itunesUrl}>
              <img alt="img" src={row.artwork} />
            </a>
          </TableCell>
          <TableCell align="center">{row.artistName}</TableCell>
          <TableCell align="center">{row.trackName}</TableCell>
          <TableCell align="center">{row.genre}</TableCell>
          <TableCell align="center">
            {
              <FavoriteIcon
                isFavorite={row.isFavorite || this.favoriteExists(row.previewUrl)}
                id={row.previewUrl}
                saveFavorites={saveFavorites}
                item={row}
              />
          }
          </TableCell>
        </TableRow>
      ));
  }

  favoriteExists(id) {
    const { favorites } = this.props;
    return !!favorites[id];
  }

  render() {
    const { tableData, title } = this.props;
    const rows = tableData || [];
    return (
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 100 }}>Link</TableCell>
              <TableCell style={{ width: 100 }} align="center">Artist</TableCell>
              <TableCell style={{ width: 100 }} align="center">Track</TableCell>
              <TableCell style={{ width: 100 }} align="center">Genre</TableCell>
              <TableCell style={{ width: 100 }} align="center">Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.getRows(rows)
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
