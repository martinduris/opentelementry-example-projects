import { environment } from './environments/environment';

require('./wrapper');

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';

const fetch = require('node-fetch');
const app = express();


app.use(cors());

app.get(`${environment.API_BASE}/account`, (req, res) => {
  res.send({ message: 'Welcome to node-api!' });
});

app.post(`${environment.API_BASE}/account/transfer`, (req, res) => {
  fetch(`${environment.LAMBDA_API_BASE}/`)
    // .then((res: any) => res.json())
    .then((json: any) => console.log(json))
    .then(() => res.send({ message: 'Welcome to node-api!' }))
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening with prefix ${environment.API_BASE}`);
});
server.on('error', console.error);
