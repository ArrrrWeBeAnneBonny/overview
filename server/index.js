const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/dist', express.static('dist'))

app.get('/overview', async (req, res) => {
  console.log('overview request query: ', req.query);
  let campId = parseInt(req.query.campId);
  console.log('campId:', campId)

  if (typeof campId !== 'number') {
    campId = 0;
  }
  console.log('campId:', campId)
  let data = await db.generalLookup(campId);

  res.send(data);
});

app.get('/overview/location', async (req, res) => {
  console.log('location request query: ', req.query);
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.locationLookup(campId);

  const mockData = {
    name: 'Twisselman Ranch',
    address: '7645 Cattle Dr, Santa Margarita, CA 93453',
    numberOfSites: 5
  };

  res.send(data);
});

app.get('/overview/owner', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.ownerLookup(campId);

  const mockData = {
    name: 'Anne B.',
    imageUrl: 'https://fec-overview.s3-us-west-2.amazonaws.com/cartoonAB.jpeg'
  };

  res.send(mockData);
});

app.get('/overview/pricing', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.pricingLookup(campId);

  const mockData = {
    averagePricePerNight: 165,
    maxGuests: 5,
    cleaningFee: 15,
    monthsOutForBooking: 6,
    weeknightDiscount: .2,
    instantBook: true
  };

  res.send(mockData);
});