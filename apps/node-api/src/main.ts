// wrapper MUST be required as soon as possible
require('./wrapper');

import * as express from 'express';
import * as cors from 'cors';

import { environment } from './environments/environment';

const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

// API to list accounts
app.get(`${environment.API_BASE}/account`, (req, res) => {
  fetch(`${environment.LAMBDA_API_BASE}/`)
    .then(() => fetch(`${environment.CORE_API_BASE}/account`))
    .then((res: any) => res.json())
    .then((data) => res.send(data));
});

// API to list account transactions
app.get(`${environment.API_BASE}/account/:accountId/transaction`, (req, res) => {
  const accountId = parseInt(req.params.accountId, 10);

  // simulate security breach
  if (accountId === 2) {
    return res.status(403).send({ 'error': 'User is not authorized!' });
  }

  fetch(`${environment.CORE_API_BASE}/account/${accountId}/transaction`)
    .then((transactions: any) => {
      if (transactions.status !== 200) {
        return res.status(500).send({ 'error': 'Cannot load transactions!' });
      }

      transactions.json().then(data => { res.send(data) });
    });
});

// API to create transaction for account
app.post(`${environment.API_BASE}/account/:accountId/transaction`, (req, res) => {
  const body = req.body;
  const accountId = parseInt(req.params.accountId, 10);

  fetch(
    `${environment.CORE_API_BASE}/account/${accountId}/transaction`,
    {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  ).then(x => {
    if (x.status !== 200) {
      return res.status(500).send({ 'error': 'Cannot create new transaction!' });
    }
    res.send(null);
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}, with prefix ${environment.API_BASE}`);
});
server.on('error', console.error);
