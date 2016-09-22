import express from 'express';
import bodyParser from 'body-parser';
import api from './api';

const app = express();
app.set('port', (process.env.API_PORT || 3001));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
