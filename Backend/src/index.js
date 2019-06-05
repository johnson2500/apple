import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import sort from './controllers/sort';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/search', async (req, res) => {
  const { term } = req ? req.query : {};
  if (!term) {
    res.status(404).send({ error: 'Query param \'term\' required.' });
    return;
  }
  try {
    const parsedQuery = term.split(' ').join('+');
    const itunesApiResponse = await axios.get(`https://itunes.apple.com/search?term=${parsedQuery}`);

    // check for data return from api call
    if (!itunesApiResponse || !itunesApiResponse.data || !itunesApiResponse.data.results) {
      res.status(404).send({ error: 'Error no data found from itunes' });
      return;
    }

    // sort data according to kind
    const sortedData = await sort({ results: itunesApiResponse.data.results });
    if (sortedData) {
      res.send(sortedData);
      return;
    }
    res.status(404).send({ error: 'Error no data found from sorted data' });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get('*', (req, res) => {
  res.status(500).send(`No api endpoint ${req.route.path} exists.`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
