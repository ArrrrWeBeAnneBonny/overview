const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/dist', express.static('dist'))

app.get('/overview', async (req, res) => {
  // console.log('overview request query: ', req.query);
  let campId = parseInt(req.query.campId);

  if (typeof campId !== 'number') {
    campId = 0;
  }

  let data = await db.generalLookup(campId);

  res.send(data);
});

app.get('/overview/location', async (req, res) => {
  // console.log('location request query: ', req.query);
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.locationLookup(campId);

  res.send(data);
});

app.get('/overview/owner', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.ownerLookup(campId);

  res.send(mockData);
});

app.get('/overview/pricing', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.pricingLookup(campId);

  res.send(data);
});