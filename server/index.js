const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 3003;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.patch('/overview/:campId', async (req, res) => {
  let campId = req.params.campId;

  const mockData = { name: 'Twisselman\'s Glamping by the Pond',
    location: {
      name: 'Twisselman Ranch',
      address: '7645 Cattle Dr, Santa Margarita, CA 93453',
      numberOfSites: 5
    },
    owner: {
      name: 'Anne B.',
      imageUrl: 'https://krita-artists.org/uploads/default/original/2X/c/cb096de3604544196cb63799a02405a0e32420bf.jpeg'
}};
res.send(mockData);
});

app.patch('/overview/:campId/location', async (req, res) => {
  let campId = req.params.campId;

  const mockData = {
    name: 'Twisselman Ranch',
    address: '7645 Cattle Dr, Santa Margarita, CA 93453',
    numberOfSites: 5
  };

  res.send(mockData);
});

app.patch('/overview/:campId/owner', async (req, res) => {
  let campId = req.params.campId;

  const mockData = {
    name: 'Anne B.',
    imageUrl: 'https://krita-artists.org/uploads/default/original/2X/c/cb096de3604544196cb63799a02405a0e32420bf.jpeg'
  };

  res.send(mockData);
});

app.patch('/overview/:campId/pricing', async (req, res) => {
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