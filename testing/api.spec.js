const database = require('../database/index.js');
const axios = require('axios');
const mongoose = require('mongoose');
// import Overview from '../client/overview';

beforeAll(async () => {

});

afterAll(async done => {
  done();
})

test('checks database general look up function', async () => {
  await mongoose.connect('mongodb://127.0.0.1/overview', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

  expect(await database.generalLookup(0)).toStrictEqual(
    expect.objectContaining({
      name: expect.any(String),
      location: expect.objectContaining({
        name: expect.any(String),
        address: expect.any(String),
        numberOfSites: expect.any(Number)
      }),
      owner: expect.objectContaining({
        name: expect.any(String),
        imageUrl: expect.any(String)
      })
    })
  );

  await mongoose.connection.close();

});

jest.mock('axios');
test('/overview should fetch object with expected properties per app and service plan', async () => {
  const overview = {
    name: 'Twisselman\’s Glamping by the Pond',
    location: {
      name: 'Twisselman Ranch',
      address: '7645 Cattle Dr, Santa Margarita, CA 93453',
      numberOfSites: 5
    },
    owner: {
      name: 'Anne B.',
      imageUrl: 'html link here'
    }
  };
  const response = { data: overview }
  axios.get.mockResolvedValue(response)
  axios.get('/oveview?campId=0').then(resp => expect(resp.data).toEqual(overview));
});

test('/overview/all should fetch object with expected properties per app and service plan', async () => {
  const overview = {
    name: 'Twisselman\’s Glamping by the Pond',
    location: {
      name: 'Twisselman Ranch',
      address: '7645 Cattle Dr, Santa Margarita, CA 93453',
      numberOfSites: 5
    },
    owner: {
      name: 'Anne B.',
      imageUrl: 'html link here'
    }
  };
  const response = { data: overview };
  axios.get.mockResolvedValue(response);
  axios.get('/oveview/all?campId=0')
    .then(resp =>
      // expect(resp.data).toEqual(overview),
      expect(resp.data).toStrictEqual(
        expect.objectContaining({
          name: expect.any(String),
          description: expect.any(String),
          location: expect.objectContaining({
            name: expect.any(String),
            address: expect.any(String),
            numberOfSites: expect.any(Number)
          }),
          owner: expect.objectContaining({
            name: expect.any(String),
            imageUrl: expect.any(String),
          }),
          pricing: expect.objectContaining({
            averagePricePerNight: expect.any(Number),
            cleaningFee: expect.any(Number),
            monthsOutForBooking: expect.any(Number),
            weeknightDiscount: expect.any(Number),
            instantBook: expect.any(Boolean)
          }),
          header: expect.objectContaining({
            percentRec: expect.any(Number)
          }),
          details: expect.objectContaining({
            checkInTime: expect.any(String),
            checkOutTime: expect.any(String),
            cancellationPolicy: expect.any(String),
            onArrival: expect.any(String),
            responseTime: expect.any(Number),
            responseRate: expect.any(Number)
          }),
          lodging: expect.objectContaining({
            type: expect.any(Number),
            numberOfSites: expect.any(Number),
            maxGuestsPerSite: expect.any(Number),
            ADAaccess: expect.any(Boolean),
            parking: expect.any(Boolean)
          }),
          essentials: expect.objectContaining({
            campfires: expect.any(Boolean),
            toilet: expect.any(Boolean),
            pets: expect.any(Boolean)
          }),
          amenities: expect.objectContaining({
            potableWater: {
              available: expect.any(Boolean),
              types: expect.any(Number),
              description: expect.any(String)
            },
            kitchen: {
              available: expect.any(Boolean),
              types: expect.any(String),
              description: expect.any(String)
            },
            shower: {
              available: expect.any(Boolean),
              types: expect.any(Number),
              description: expect.any(String)
            },
            picnicTable: {
              available: expect.any(Boolean),
              description: expect.any(String)
            },
            wifi: {
              available: expect.any(Boolean),
              description: expect.any(String)
            },
            bins: {
              available: expect.any(Boolean),
              types: expect.any(String),
              description: expect.any(String)
            }
          })
        })
      )
    )
    .catch(err => {
      console.log('error occured: ', err)
    })
});