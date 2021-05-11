const database = require('../database/index.js');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/overview', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
});

afterAll(async done => {
  await mongoose.connection.close();
  done();
})

test('overview returns object',async () => {
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
})