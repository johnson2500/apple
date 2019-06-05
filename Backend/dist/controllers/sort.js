"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = ({
  results
}) => {
  if (!results || !Array.isArray(results)) {
    throw new Error('Error data no found.');
  }

  const sortObject = {}; // create map of all possible kinds

  const kindMap = {
    book: 'Books',
    album: 'Albums',
    'coached-audio': 'Audio',
    'feature-movie': 'Movies',
    'interactive-booklet': 'Books',
    'music-video': 'Music Video',
    pdf: 'Documents',
    podcast: 'Podcasts',
    'podcast-episode': 'Posdcasts',
    'software-package': 'Software',
    song: 'Songs',
    tvepisode: 'Television',
    artist: 'Artists'
  };
  results.forEach(item => {
    const {
      kind,
      artistName,
      artworkUrl100,
      trackName,
      primaryGenreName,
      artistId,
      collectionViewUrl,
      previewUrl
    } = item;
    const parsedKind = kindMap[kind] || 'Other'; // if type exist add to item

    if (sortObject[parsedKind]) {
      sortObject[parsedKind].push({
        kind,
        artistName,
        artwork: artworkUrl100,
        trackName,
        artistId,
        genre: primaryGenreName,
        itunesUrl: collectionViewUrl,
        previewUrl
      });
    } else {
      // add new item
      sortObject[parsedKind] = [{
        kind,
        artistName,
        artwork: artworkUrl100,
        trackName,
        artistId,
        genre: primaryGenreName,
        itunesUrl: collectionViewUrl,
        previewUrl
      }];
    }
  });
  return sortObject;
};

exports.default = _default;