const {seed, closeConn, dbURL} = require('./seeder.js');
const mongoose = require('mongoose');
const helper = require('./helperFuncs.js');
const { twisselman } = require('./twisselman.js')

mongoose.connect(dbURL);
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
        console.log('Call seed file. # of docs currently:', result.length);
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
        response = {
          name: twisselman.name,
          location: {
            name: twisselman.location.name,
            address: twisselman.location.address,
            numberOfSites: twisselman.lodging.numberOfSites
          },
          owner: {
            name: twisselman.owner.name,
            imageUrl: twisselman.owner.imageUrl
          }
        }
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
        response = {
          name: twisselman.location.name,
          address: twisselman.location.address,
          numberOfSites: twisselman.lodging.numberOfSites
        };
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
        response = {
          name: twisselman.owner.name,
          imageUrl: twisselman.owner.imageUrl,
          randomSite: Math.floor(Math.random() * twisselman.lodging.numberOfSites)
        };
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
          instantBook: info.pricing.instantBook,
          minimumNights: info.pricing.minimumNights
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
        response = {
          averagePricePerNight: twisselman.pricing.averagePricePerNight,
          maxGuests: twisselman.lodging.maxGuestsPerSite,
          cleaningFee: twisselman.pricing.cleaningFee,
          monthsOutForBooking: twisselman.pricing.monthsOutForBooking,
          weeknightDiscount: twisselman.pricing.weeknightDiscount,
          instantBook: twisselman.pricing.instantBook,
          minimumNights: twisselman.pricing.minimumNights
        };
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
            state: helper.stateLookup(info.location.address),
            country: 'United States',
            numberOfSites: info.lodging.numberOfSites,
            verified: info.location.verified
          },
          owner: {
            name: info.owner.name,
            imageUrl: info.owner.imageUrl,
            verified: info.owner.verified
          },
          pricing: {
            averagePricePerNight: info.pricing.averagePricePerNight,
            cleaningFee: info.pricing.cleaningFee,
            monthsOutForBooking: info.pricing.monthsOutForBooking,
            weeknightDiscount: info.pricing.weeknightDiscount,
            instantBook: info.pricing.instantBook,
            minimumNights: info.pricing.minimumNights
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
            type: info.lodging.type,
            housing: helper.lodgingTypes(info.lodging.type),
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
        response.err = error;
        response = {
          name: twisselman.name,
          description: twisselman.description,
          location: {
            name: twisselman.location.name,
            address: twisselman.location.address,
            state: helper.stateLookup(twisselman.location.address),
            country: 'United States',
            numberOfSites: twisselman.lodging.numberOfSites,
            verified: twisselman.location.verified
          },
          owner: {
            name: twisselman.owner.name,
            imageUrl: twisselman.owner.imageUrl,
            verified: twisselman.owner.verified
          },
          pricing: {
            averagePricePerNight: twisselman.pricing.averagePricePerNight,
            cleaningFee: twisselman.pricing.cleaningFee,
            monthsOutForBooking: twisselman.pricing.monthsOutForBooking,
            weeknightDiscount: twisselman.pricing.weeknightDiscount,
            instantBook: twisselman.pricing.instantBook,
            minimumNights: twisselman.pricing.minimumNights
          },
          details: {
            checkInTime: helper.timeToStringHour(twisselman.details.checkInTime),
            checkOutTime: helper.timeToStringHour(twisselman.details.checkOutTime),
            cancellationPolicy: helper.cancellationMessage(twisselman.details.cancellationPolicy),
            onArrival: helper.arrivalType(twisselman.details.onArrival),
            responseTime: twisselman.details.responseTime,
            responseRate: twisselman.details.responseRate
          },
          lodging: {
            type: twisselman.lodging.type,
            housing: helper.lodgingTypes(twisselman.lodging.type),
            numberOfSites: twisselman.lodging.numberOfSites,
            maxGuestsPerSite: twisselman.lodging.maxGuestsPerSite,
            ADAaccess: twisselman.lodging.ADAaccess,
            parking: twisselman.lodging.parking
          },
          essentials: {
            campfires: twisselman.essentials.campfires,
            toilet: twisselman.essentials.toilet,
            pets: twisselman.essentials.pets
          },
          amenities: {
            potableWater: {
              available: twisselman.amenities.potableWater.available,
              types: helper.potableWaterTypes[twisselman.amenities.potableWater.types],
              description: twisselman.amenities.potableWater.description
            },
            kitchen: helper.hasKitchen(twisselman.amenities.kitchen),
            shower: helper.hasShower(twisselman.amenities.shower),
            picnicTable: {
              available: twisselman.amenities.picnicTable.available,
              description: twisselman.amenities.picnicTable.description
            },
            wifi: {
              available: twisselman.amenities.wifi.available,
              description: twisselman.amenities.wifi.description
            },
            bins: helper.hasBins(twisselman.amenities.bins)
          }
        };
      });

      return response;
  }
}
