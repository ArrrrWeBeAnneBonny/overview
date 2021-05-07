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
  console.log('request query: ', req.query)
  let campId = parseInt(req.query.campId);
  if (typeof campId !== 'Number') {
    campId = 0;
  }

  let data = await db.generalLookup(campId);


  const mockData = { name: 'Twisselman\'s Glamping by the Pond',
    location: {
      name: 'Twisselman Ranch',
      address: '7645 Cattle Dr, Santa Margarita, CA 93453',
      numberOfSites: 5
    },
    owner: {
      name: 'Anne B.',
      imageUrl: 'https://fec-overview.s3-us-west-2.amazonaws.com/cartoonAB.jpeg'
}};
res.send(data);
});

app.get('/overview/location', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  const mockData = {
    name: 'Twisselman Ranch',
    address: '7645 Cattle Dr, Santa Margarita, CA 93453',
    numberOfSites: 5
  };

  res.send(mockData);
});

app.get('/overview/owner', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

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