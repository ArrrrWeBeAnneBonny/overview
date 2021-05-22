const database = require('../database/index.js');
const axios = require('axios');
const mongoose = require('mongoose');

describe('database functions', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1/FEC', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  })
  test('checks database general look up function', async () => {

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
  });

  test('checks database owner look up function', async () => {
    expect(await database.ownerLookup(0)).toStrictEqual(
      expect.objectContaining({
        name: expect.any(String),
        imageUrl: expect.any(String),
        randomSite: expect.any(Number)
      })
    );
  });

  test('makes sure database pricing object has the correct variables', async () => {
    expect(await database.pricingLookup(5)).toStrictEqual(
      expect.objectContaining({
        averagePricePerNight: expect.any(Number),
        cleaningFee: expect.any(Number),
        monthsOutForBooking: expect.any(Number),
        weeknightDiscount: expect.any(Number),
        minimumNights: expect.any(Number),
        instantBook: expect.any(Boolean)
      })
    );

  });
})

jest.mock('axios');
describe('API calls', () => {
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
    axios.get('/oveview?campId=0')
      .then(resp => expect(resp.data).toEqual(overview));
  });

  test('/overview/all should fetch object with expected properties per app and service plan', async () => {
    expect.assertions(2);
    const overview = {
      name: 'Twisselman’s Glamping by the Pond',
      description: 'Voted BEST HIPCAMP Glamping in the United States!! Come Glamping & experience our Rural Retreat here at Twisselman Ranch. Come glamp next to our pond under breathtaking stars located in beautiful Carrisa Plains, California.',
      location: {
        name: 'Twisselman Ranch',
        address: '7645 Cattle Dr, Santa Margarita, CA 93453',
        numberOfSites: 5
      },
      owner: {
        name: 'Anne B.',
        imageUrl: 'https://fec-overview.s3-us-west-2.amazonaws.com/cartoonAB.jpeg'
      },
      pricing: {
        averagePricePerNight: 165,
        cleaningFee: 15,
        monthsOutForBooking: 6,
        weeknightDiscount: 0.2,
        instantBook: true
      },
      details: {
        checkInTime: '3PM',
        checkOutTime: '11AM',
        cancellationPolicy: 'Super Strict (30 days)',
        onArrival: 'Meet and greet',
        responseTime: 0,
        responseRate: 0
      },
      lodging: {
        type: 'Canvas Tent',
        numberOfSites: 5,
        maxGuestsPerSite: 5,
        ADAaccess: false,
        parking: true
      },
      essentials: { campfires: true, toilet: true, pets: true },
      amenities: {
        potableWater: { available: false, types: '', description: '' },
        kitchen: {
          available: true,
          description: 'Communal Kitchen Area includes: Sink, gas bbq grill, gas burners NO : pots, pans, cooking utensils etc. Please come fully prepared with all the nessecary essentials',
          types: 'grill over firepit'
        },
        shower: {
          available: true,
          description: 'We have a beautiful two stall hot water shower',
          types: 'Hot Water'
        },
        picnicTable: { available: true, description: '' },
        wifi: { available: false, description: '' },
        bins: {
          available: true,
          description: 'Trash barrels throughout the site',
          types: ''
        }
      },
      header: { percentRec: 0.75 }
    };
    const response = { data: overview };
    axios.get.mockResolvedValue(response);
    await axios.get('/oveview/all?campId=0')
      .then(resp => {
        expect(resp.data).toStrictEqual(overview);

        expect(resp.data).toStrictEqual(expect.objectContaining({
          name: expect.any(String),
          description: expect.any(String),
          header: expect.objectContaining({
            percentRec: expect.any(Number)
          }),
          location: expect.objectContaining({
            name: expect.any(String),
            address: expect.any(String),
            numberOfSites: expect.any(Number)
          }),
          owner: expect.objectContaining({
            name: expect.any(String),
            imageUrl: expect.any(String)
          }),
          pricing: expect.objectContaining({
            averagePricePerNight: expect.any(Number),
            cleaningFee: expect.any(Number),
            monthsOutForBooking: expect.any(Number),
            weeknightDiscount: expect.any(Number),
            instantBook: expect.any(Boolean)
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
            type: expect.any(String),
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
            potableWater: expect.objectContaining({
              available: expect.any(Boolean),
              types: expect.any(String),
              description: expect.any(String)
            }),
            kitchen: expect.objectContaining({
              available: expect.any(Boolean),
              description: expect.any(String),
              types: expect.any(String)
            }),
            shower: expect.objectContaining({
              available: expect.any(Boolean),
              description: expect.any(String),
              types: expect.any(String)
            }),
            picnicTable: expect.objectContaining({
              available: expect.any(Boolean),
              description: expect.any(String)
            }),
            wifi: expect.objectContaining({
              available: expect.any(Boolean),
              description: expect.any(String)
            }),
            bins: expect.objectContaining({
              available: expect.any(Boolean),
              description: expect.any(String),
              types: expect.any(String)
            })
          })
        }));
      });
  });
})