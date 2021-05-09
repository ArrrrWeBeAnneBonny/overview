const database = require('../database/index.js');

test('overview returns object', () => {
  expect(database.generalLookup(0)).toBe(expect.objectContaining({
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
  }));
})