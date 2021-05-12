const database = require('../database/index.js');
const axios = require('axios');
const mongoose = require('mongoose');
// import Overview from '../client/overview';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/overview', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
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
  const response = {data: overview}
  axios.get.mockResolvedValue(response)
  axios.get('/oveview?campId=0').then(resp => expect(resp.data).toEqual(overview));
});

