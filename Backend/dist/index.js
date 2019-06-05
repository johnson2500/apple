"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _axios = _interopRequireDefault(require("axios"));

var _sort = _interopRequireDefault(require("./controllers/sort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 8000;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.get('/api/search', async (req, res) => {
  const {
    term
  } = req ? req.query : {};

  if (!term) {
    res.status(404).send({
      error: 'Query param \'term\' required.'
    });
    return;
  }

  try {
    const parsedQuery = term.split(' ').join('+');
    const itunesApiResponse = await _axios.default.get(`https://itunes.apple.com/search?term=${parsedQuery}`);
    console.log(parsedQuery); // check for data return from api call

    if (!itunesApiResponse || !itunesApiResponse.data || !itunesApiResponse.data.results) {
      res.status(404).send({
        error: 'Error no data found from itunes'
      });
      return;
    } // sort data according to kind


    const sortedData = await (0, _sort.default)({
      results: itunesApiResponse.data.results
    });
    console.log(sortedData);

    if (sortedData) {
      res.send(sortedData);
      return;
    }

    res.status(404).send({
      error: 'Error no data found from sorted data'
    });
  } catch (e) {
    res.send({
      error: e.message
    });
  }
});
app.get('*', (req, res) => {
  res.status(500).send(`No api endpoint ${req.route.path} exists.`);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));