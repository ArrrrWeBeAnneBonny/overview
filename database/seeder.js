const faker = require('faker');
const mongoose = require('mongoose');

const { addresses } = require('./addresses.js');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true, useUnifiedTopology: true });
db = mongoose.connection;
try {
  db.on('error', () => {
    throw Error('DB Not Connected!')
  });
  db.once('open', () => {
    console.log('DB Connected in seeder')
  });
} catch (error) {
  console.log('ERROR: ', error);
}

// ----- SCHEMAS -----

const locationSchema = new mongoose.Schema({
  name: String,
  address: String
});

const ownerSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
});

const pricingSchema = new mongoose.Schema({
  averagePricePerNight: Number,
  cleaningFee: Number,
  monthsOutForBooking: Number,
  weeknightDiscount: Number,
  instantBook: Boolean
});

const detailsSchema = new mongoose.Schema({
  checkInTime: Number,
  checkOutTime: Number,
  cancellationPolicy: Number,
  onArrival: Number,
  responseTime: Number,
  responseRate: Number
});

const lodgingSchema = new mongoose.Schema({
  type: Number,
  numberOfSites: Number,
  maxGuestsPerSite: Number,
  ADAaccess: Boolean,
  parking: Boolean
});

const essentialsSchema = new mongoose.Schema({
  campfires: Boolean,
  toilet: Boolean,
  pets: Boolean
});

const amenitiesSchema = new mongoose.Schema({
  potableWater: {
    available: Boolean,
    options: String,
    description: String
  },
  kitchen: {
    available: Boolean,
    options: String,
    description: String
  },
  shower: {
    available: Boolean,
    options: String,
    description: String
  },
  picnicTable: {
    available: Boolean,
    description: String
  },
  wifi: {
    available: Boolean,
    description: String
  },
  bins: {
    available: Boolean,
    options: String,
    description: String
  }
});

const activitiesSchema = new mongoose.Schema({
  biking: Boolean,
  fishing: Boolean,
  hiking: Boolean,
  horsebackRiding: Boolean,
  boating: Boolean,
  offRoading: Boolean,
  whitewaterPaddling: Boolean,
  climbing: Boolean,
  snowsports: Boolean,
  surfing: Boolean,
  windsports: Boolean,
  swimming: Boolean,
  paddling: Boolean,
  wildlifeWatching: Boolean,
  surfing: Boolean
});

const terrainSchema = new mongoose.Schema({
  lake: Boolean,
  beach: Boolean,
  forest: Boolean,
  reviewStreamCreek: Boolean,
  hotSpring: Boolean,
  swimmingHole: Boolean,
  desert: Boolean,
  cave: Boolean,
  waterfall: Boolean,
  driveway: Boolean
});

const overviewSchema = new mongoose.Schema({
  siteId: Number,
  name: String,
  description: String,
  location: locationSchema,
  owner: ownerSchema,
  pricing: pricingSchema,
  details: detailsSchema,
  lodging: lodgingSchema,
  essentials: essentialsSchema,
  amenities: amenitiesSchema,
  activities: activitiesSchema,
  terrain: terrainSchema
})

// -----MODELS-----
const Location = mongoose.model('Location', locationSchema);
const Owner = mongoose.model('Owner', ownerSchema);
const Pricing = mongoose.model('Pricing', pricingSchema);
const Details = mongoose.model('Details', detailsSchema);
const Lodging = mongoose.model('Lodging', lodgingSchema);
const Essentials = mongoose.model('Essentials', essentialsSchema);
const Amenities = mongoose.model('Amenities', amenitiesSchema);
const Activities = mongoose.model('Activities', activitiesSchema);
const Terrain = mongoose.model('Terrain', terrainSchema);
const Overview = mongoose.model('Overview', overviewSchema);

module.exports.seed = async () => {
  try {
    await db.dropCollection('owners')
      .then(result => {
        console.log('owners dropped ', result);
      })
  } catch (error) {
    console.log('error: ', error)
  };

  try {
    await db.dropCollection('locations')
      .then(result => {
        console.log('locations dropped ', result);
      })
  } catch (error) {
    console.log('error: ', error)
  };

  try {
    await db.dropCollection('pricings')
      .then(result => {
        console.log('pricings dropped ', result);
      })
  } catch (error) {
    console.log('error: ', error)
  };
  try {
    await db.dropCollection('details')
      .then(result => {
        console.log('details dropped ', result);
      })
  } catch (error) {
    console.log('error: ', error)
  };
  try {
    await db.dropCollection('lodgings')
      .then(result => {
        console.log('lodgings dropped ', result);
      })
  } catch (error) {
    console.log('error: ', error)
  };

  for (let i = 0; i < 5; i++) {
    //---LOCATION---
    const locName = faker.commerce.productAdjective() + ' ' + faker.animal.dog() + ' ' + faker.address.streetSuffix();
    const locAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const newLocation = {
      name: locName,
      address: locAddress
    };
    console.log('Location info: ', newLocation);

    // await Location.create(newLocation)
    //   .then(result => {
    //     console.log('Location Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---OWNER---
    const ownerImageUrl = faker.image.avatar();
    const ownerName = faker.name.firstName() + ' ' + alphabet[Math.floor(Math.random() * alphabet.length)] + '.';
    const newOwner = {
      name: ownerName,
      imageUrl: ownerImageUrl
    };
    console.log('owner info: ', newOwner);

    // await Owner.create(newOwner)
    //   .then(result => {
    //     console.log('Owner Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---Pricing---
    const averagePricePerNight = faker.datatype.number({ min: 40, max: 250, precision: 10 });
    const cleaningFee = faker.datatype.number({ min: 10, max: 50, precision: 1 });
    const monthsOutForBooking = faker.datatype.number({ min: 2, max: 10, precision: 1 });
    const weeknightDiscount = faker.datatype.number({ min: 0, max: .5, precision: .1 });
    const instantBook = faker.datatype.boolean();
    const newPrice = {
      averagePricePerNight: averagePricePerNight,
      cleaningFee: cleaningFee,
      monthsOutForBooking: monthsOutForBooking,
      weeknightDiscount: weeknightDiscount,
      instantBook: instantBook
    };
    console.log('Pricing info: ', newPrice);

    // await Owner.create(newOwner)
    //   .then(result => {
    //     console.log('Owner Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---DETAILS---
    const checkInTime = faker.datatype.number({ min: 12, max: 19, precision: 1 });
    const checkOutTime = faker.datatype.number({ min: 9, max: 13, precision: 1 })
    const cancellationPolicy = faker.datatype.number({ min: 1, max: 3, precision: 1 });
    const onArrival = faker.datatype.number({ min: 0, max: 2, precision: 1 });
    const responseTime = instantBook ? 0 : faker.datatype.number({ min: 1, max: 12, precision: 1 });
    const responseRate = instantBook ? 0 : faker.datatype.number({ min: 0.5, max: 1, precision: .05 });
    const newDetails = {
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      cancellationPolicy: cancellationPolicy,
      onArrival: onArrival,
      responseTime: responseTime,
      responseRate: responseRate
    };
    console.log('Details info: ', newDetails);

    // await Details.create(newDetails)
    //   .then(result => {
    //     console.log('Details Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---LODGING---
    const type = faker.datatype.number({ min: 1, max: 5, precision: 1 });
    const numberOfSites = faker.datatype.number({ min: 1, max: 13, precision: 1 })
    const maxGuestsPerSite = faker.datatype.number({ min: 1, max: 14, precision: 1 });
    const ADAaccess = faker.datatype.boolean();
    const parking = faker.datatype.boolean();
    const newLodging = {
      type: type,
      numberOfSites: numberOfSites,
      maxGuestsPerSite: maxGuestsPerSite,
      ADAaccess: ADAaccess,
      parking: parking
    };
    console.log('Lodging info: ', newLodging);

    // await Lodging.create(newLodging)
    //   .then(result => {
    //     console.log('Lodging Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---ESSENTIALS---
    const campfires = faker.datatype.boolean();
    const toilet = faker.datatype.boolean();
    const pets = faker.datatype.boolean();
    const newEssentials = {
      campfires: campfires,
      toilet: toilet,
      pets: pets
    };
    console.log('Essentials info: ', newEssentials);

    // await Essentials.create(newEssentials)
    //   .then(result => {
    //     console.log('Essentials Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

    //---AMENITIES---
    const potableWater = {
      available: Boolean,
      options: String,
      description: String
    };
    const kitchen = {
      available: Boolean,
      options: String,
      description: String
    };
    const shower = {
      available: Boolean,
      options: String,
      description: String
    };
    const picnicTable = {
      available: Boolean,
      description: String
    };
    const wifi = {
      available: Boolean,
      description: String
    };
    const bins = {
      available: Boolean,
      options: String,
      description: String
    };
    const newAmenities = {
      potableWater: potableWater,
      kitchen: kitchen,
      shower: shower,
      picnicTable: picnicTable,
      wifi: wifi,
      bins: bins
    };
    console.log('Amenities info: ', newAmenities);

    // await Amenities.create(newAmenities)
    //   .then(result => {
    //     console.log('Amenities Saved: ', result);
    //   })
    //   .catch(err => {
    //     console.log('error creating doc: ', err)
    //   });

  }


};