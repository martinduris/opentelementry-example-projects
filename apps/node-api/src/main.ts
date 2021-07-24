// wrapper MUST be required as soon as possible
require('./wrapper');

import * as express from 'express';
import * as cors from 'cors';

import { environment } from './environments/environment';

const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.post(`${environment.API_BASE}/account`, (req, res) => {
  fetch(`${environment.LAMBDA_API_BASE}/`)
    .then(() => fetch(`${environment.CORE_API_BASE}/account`))
    .then((res: any) => res.json())
    // .then(() => res.status(500).send({ 'error': 'Not working!' }));
    .then((data) => res.send(data));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}, with prefix ${environment.API_BASE}`);
});
server.on('error', console.error);
