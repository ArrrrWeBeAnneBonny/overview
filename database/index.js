const {seed, closeConn} = require('./seeder.js');
const mongoose = require('mongoose');
const helper = require('./helperFuncs.js');

mongoose.connect('mongodb://127.0.0.1/FEC');
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

const testConnection = async () => {
  db.on('error', () => {
    console.log('ERROR! DB no Connected...')
  });
  db.once('open', () => {
    console.log('DB Connected!')
  });

  await Overview.find().exec()
    .then(result => {
      if (result.length < 100) {
        console.log('Call seed file. Overview not fully seeded. # of docs:', result.length);
         seed();
      // } else {
      //   closeConn();
      }
    });
}

const Overview = mongoose.model('Overview');

testConnection();

module.exports = {
  generalLookup: async (campId) => {
    let response = {};
    await Overview.find({campId}).exec()
      .then(query => {
        // console.log('general query returned: ', query);
        let info = query[0];
        response = {
          name: info.name,
          location: {
            name: info.location.name,
            address: info.location.address,
            numberOfSites: info.lodging.numberOfSites
          },
          owner: {
            name: info.owner.name,
            imageUrl: info.owner.imageUrl
          }
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });

      // console.log(response);
      return response;
  },

  locationLookup: async (campId) => {
    let response = {};
    await Overview.find({campId}, 'location lodging').exec()
      .then(query => {
        // console.log('location query returned: ', query)
        let info = query[0];
        response = {
          name: info.location.name,
          address: info.location.address,
          numberOfSites: info.lodging.numberOfSites
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });
      return response;
  },

  ownerLookup: async (campId) => {
    let response = {};
    await Overview.find({campId: campId}, 'owner lodging').exec()
      .then(query => {
        // console.log('owner query returned: ', query);
        if (query.length === 0) {
          throw new Error('No queries found')
        }
        let info = query[0];
        response = {
          name: info.owner.name,
          imageUrl: info.owner.imageUrl,
          randomSite: Math.floor(Math.random() * info.lodging.numberOfSites)
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });
      return response;
  },

  pricingLookup: async (campId) => {
    let response = {};
    await Overview.find({campId}, 'pricing lodging').exec()
      .then(query => {
        // console.log('Pricing query returned: ', query);
        let info = query[0];
        response = {
          averagePricePerNight: info.pricing.averagePricePerNight,
          maxGuests: info.lodging.maxGuestsPerSite,
          cleaningFee: info.pricing.cleaningFee,
          monthsOutForBooking: info.pricing.monthsOutForBooking,
          weeknightDiscount: info.pricing.weeknightDiscount,
          instantBook: info.pricing.instantBook
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });
      return response;
  },

  overviewLookup: async (campId) => {
    let response = {};
    await Overview.find({campId}).exec()
      .then(query => {
        // console.log('general query returned: ', query);
        let info = query[0];
        response = {
          name: info.name,
          description: info.description,
          location: {
            name: info.location.name,
            address: info.location.address,
            numberOfSites: info.lodging.numberOfSites
          },
          owner: {
            name: info.owner.name,
            imageUrl: info.owner.imageUrl
          },
          pricing: {
            averagePricePerNight: info.pricing.averagePricePerNight,
            cleaningFee: info.pricing.cleaningFee,
            monthsOutForBooking: info.pricing.monthsOutForBooking,
            weeknightDiscount: info.pricing.weeknightDiscount,
            instantBook: info.pricing.instantBook
          },
          details: {
            checkInTime: helper.timeToStringHour(info.details.checkInTime),
            checkOutTime: helper.timeToStringHour(info.details.checkOutTime),
            cancellationPolicy: helper.cancellationMessage(info.details.cancellationPolicy),
            onArrival: helper.arrivalType(info.details.onArrival),
            responseTime: info.details.responseTime,
            responseRate: info.details.responseRate
          },
          lodging: {
            type: helper.lodgingTypes(info.lodging.type),
            numberOfSites: info.lodging.numberOfSites,
            maxGuestsPerSite: info.lodging.maxGuestsPerSite,
            ADAaccess: info.lodging.ADAaccess,
            parking: info.lodging.parking
          },
          essentials: {
            campfires: info.essentials.campfires,
            toilet: info.essentials.toilet,
            pets: info.essentials.pets
          },
          amenities: {
            potableWater: {
              available: info.amenities.potableWater.available,
              types: helper.potableWaterTypes[info.amenities.potableWater.types],
              description: info.amenities.potableWater.description
            },
            kitchen: helper.hasKitchen(info.amenities.kitchen),
            shower: helper.hasShower(info.amenities.shower),
            picnicTable: {
              available: info.amenities.picnicTable.available,
              description: info.amenities.picnicTable.description
            },
            wifi: {
              available: info.amenities.wifi.available,
              description: info.amenities.wifi.description
            },
            bins: helper.hasBins(info.amenities.bins)
          }
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });

      return response;
  }
}
