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
  if (!campId) {
    campId = 0;
  }
  console.log(campId)


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
res.send(mockData);
});

app.get('/overview/:campId/location', async (req, res) => {
  let campId = req.params.campId;

  const mockData = {
    name: 'Twisselman Ranch',
    address: '7645 Cattle Dr, Santa Margarita, CA 93453',
    numberOfSites: 5
  };

  res.send(mockData);
});

app.get('/overview/:campId/owner', async (req, res) => {
  let campId = req.params.campId;

  const mockData = {
    name: 'Anne B.',
    imageUrl: 'https://krita-artists.org/uploads/default/original/2X/c/cb096de3604544196cb63799a02405a0e32420bf.jpeg'
  };

  res.send(mockData);
});

app.get('/overview/:campId/pricing', async (req, res) => {
  let campId = req.params.campId;

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