const axios = require('axios');
const faker = require('faker');
const mongoose = require('mongoose');

const { addresses } = require('./addresses.js');
const { twisselman } = require('./twisselman.js')
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const dbURL = 'mongodb://localhost:27017/FEC';

console.log('DB URL: ', dbURL);
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
try {
  db.on('error', () => {
    console.log('ERROR! DB no Connected...')
  });
  db.once('open', () => {
    console.log('DB connected in seeder')
  });
} catch (error) {
  console.log('ERROR: ', error);
}

// ----- SCHEMAS -----
const locationSchema = new mongoose.Schema({
  name: String,
  address: String,
  verified: Boolean
});

const ownerSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  verified: Boolean
});

const pricingSchema = new mongoose.Schema({
  averagePricePerNight: Number,
  cleaningFee: Number,
  monthsOutForBooking: Number,
  weeknightDiscount: Number,
  minimumNights: Number,
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
    types: Number,
    description: String
  },
  kitchen: {
    available: Boolean,
    types: [Number],
    description: String
  },
  shower: {
    available: Boolean,
    types: Number,
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
    types: [Number],
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
  campId: { type: Number, unique: true, required: true },
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

// -----MODEL-----
const Overview = mongoose.model('Overview', overviewSchema);

const seed = async () => {
  await Overview.find().exec()
    .then(async (result) => {
      if (result.length > 0) {
        await db.dropCollection('overviews')
          .then(result => {
            console.log('overviews dropped ', result);
          });
      }
    })
    .catch((error) => {
      console.log('error: ', error)
    });

  for (let i = 0; i < 100; i++) {
    if (i === 0) {
      // console.log('Overview info: ', twisselman);

      await Overview.create(twisselman)
        .then(result => {
          console.log('Twisselman Saved');
        })
        .catch(err => {
          console.log('Error creating Twisselman doc: ', err)
        });
      continue;
    }

    //---LOCATION---
    const locName = faker.animal.dog() + ' ' + faker.address.streetSuffix();
    const locAddress = addresses[Math.floor(Math.random() * addresses.length)];
    const verified = faker.datatype.boolean();
    const newLocation = {
      name: locName,
      address: locAddress,
      verified
    };
    // console.log('Location info: ', newLocation);

    //---OWNER---
    const ownerImageUrl = `https://fec-overview.s3-us-west-2.amazonaws.com/ownerPics/${i}.jpg`;
    const ownerName = faker.name.firstName() + ' ' + alphabet[Math.floor(Math.random() * alphabet.length)] + '.';
    const ownerVerified = faker.datatype.boolean();
    const newOwner = {
      name: ownerName,
      imageUrl: ownerImageUrl,
      verified: ownerVerified
    };
    // console.log('owner info: ', newOwner);

    //---PRICING---
    const averagePricePerNight = faker.datatype.number({ min: 40, max: 250, precision: 10 });
    const cleaningFee = faker.datatype.number({ min: 10, max: 50, precision: 1 });
    const monthsOutForBooking = faker.datatype.number({ min: 2, max: 10, precision: 1 });
    const weeknightDiscount = faker.datatype.number({ min: 0, max: .5, precision: .1 });
    const instantBook = faker.datatype.boolean();
    const minimumNights = faker.datatype.number({ min: 1, max: 4, precision: 1 });
    const newPrice = {
      averagePricePerNight,
      cleaningFee,
      monthsOutForBooking,
      weeknightDiscount,
      instantBook,
      minimumNights
    };
    // console.log('Pricing info: ', newPrice);

    //---DETAILS---
    const checkInTime = faker.datatype.number({ min: 12, max: 19, precision: 1 });
    const checkOutTime = faker.datatype.number({ min: 9, max: 13, precision: 1 })
    const cancellationPolicy = faker.datatype.number({ min: 1, max: 4, precision: 1 });
    const onArrival = faker.datatype.number({ min: 0, max: 2, precision: 1 });
    const responseTime = instantBook ? 0 : faker.datatype.number({ min: 1, max: 12, precision: 1 });
    const responseRate = instantBook ? 0 : faker.datatype.number({ min: 0.5, max: 1, precision: .05 });
    const newDetails = {
      checkInTime,
      checkOutTime,
      cancellationPolicy,
      onArrival,
      responseTime,
      responseRate
    };
    // console.log('Details info: ', newDetails);

    //---LODGING---
    const type = faker.datatype.number({ min: 1, max: 5, precision: 1 });
    const numberOfSites = faker.datatype.number({ min: 1, max: 13, precision: 1 })
    const maxGuestsPerSite = faker.datatype.number({ min: 1, max: 14, precision: 1 });
    const ADAaccess = faker.datatype.boolean();
    const parking = faker.datatype.boolean();
    const newLodging = {
      type,
      numberOfSites,
      maxGuestsPerSite,
      ADAaccess,
      parking
    };
    // console.log('Lodging info: ', newLodging);

    //---ESSENTIALS---
    const campfires = faker.datatype.boolean();
    const toilet = faker.datatype.boolean();
    const pets = faker.datatype.boolean();
    const newEssentials = {
      campfires,
      toilet,
      pets
    };
    // console.log('Essentials info: ', newEssentials);

    //---AMENITIES---
    let available = faker.datatype.boolean();
    const potableWater = {
      available,
      types: available ? faker.datatype.number({ min: 1, max: 3, precision: 1 }) : 0,
      description: available ? faker.lorem.sentences() : ''
    };

    available = faker.datatype.boolean();
    let kitchenTypes = available ? new Array(faker.datatype.number({ min: 1, max: 4, precision: 1 })) : 0;
    if (available) {
      for (let j = 0; j < kitchenTypes.length; j++) {
        let randNum = faker.datatype.number({ min: 1, max: 6, precision: 1 });
        if (kitchenTypes.includes(randNum)) {
          j--;
        } else {
          kitchenTypes[j] = randNum;
        }
      }
    }
    // console.log('kitchen types: ', kitchenTypes);
    const kitchen = {
      available,
      types: kitchenTypes,
      description: available ? faker.lorem.sentences() : ''
    };

    available = faker.datatype.boolean();
    const shower = {
      available,
      types: available ? faker.datatype.number({ min: 1, max: 2, precision: 1 }) : 0,
      description: available ? faker.lorem.sentences() : ''
    };

    available = faker.datatype.boolean();
    const picnicTable = {
      available,
      description: available ? faker.lorem.sentences() : ''
    };

    available = faker.datatype.boolean();
    const wifi = {
      available,
      description: available ? faker.lorem.sentences() : ''
    };

    available = faker.datatype.boolean();
    let binTypes = available ? Array.from({ length: faker.datatype.number({ min: 1, max: 3, precision: 1 }) }, (_, i) => i + 1) : 0;
    // console.log('bin types: ', binTypes);

    const bins = {
      available,
      types: available ? faker.datatype.number({ min: 1, max: 3, precision: 1 }) : 0,
      description: available ? faker.lorem.sentences() : ''
    };

    const newAmenities = {
      potableWater,
      kitchen,
      shower,
      picnicTable,
      wifi,
      bins
    };
    // console.log('Amenities info: ', newAmenities);

    //---ACTIVITIES---
    const newActivities = {
      biking: faker.datatype.boolean(),
      fishing: faker.datatype.boolean(),
      hiking: faker.datatype.boolean(),
      horsebackRiding: faker.datatype.boolean(),
      boating: faker.datatype.boolean(),
      offRoading: faker.datatype.boolean(),
      whitewaterPaddling: faker.datatype.boolean(),
      climbing: faker.datatype.boolean(),
      snowsports: faker.datatype.boolean(),
      surfing: faker.datatype.boolean(),
      windsports: faker.datatype.boolean(),
      swimming: faker.datatype.boolean(),
      paddling: faker.datatype.boolean(),
      wildlifeWatching: faker.datatype.boolean(),
      surfing: faker.datatype.boolean()
    }
    // console.log('Activities info: ', newActivities);

    //---TERRAIN---
    const newTerrain = {
      lake: faker.datatype.boolean(),
      beach: faker.datatype.boolean(),
      forest: faker.datatype.boolean(),
      reviewStreamCreek: faker.datatype.boolean(),
      hotSpring: faker.datatype.boolean(),
      swimmingHole: faker.datatype.boolean(),
      desert: faker.datatype.boolean(),
      cave: faker.datatype.boolean(),
      waterfall: faker.datatype.boolean(),
      ranch: faker.datatype.boolean(),
      driveway: faker.datatype.boolean()
    }
    // console.log('Terrain info: ', newTerrain);

    //---OVERVIEW---
    const newOverview = {
      campId: i,
      name: faker.commerce.productAdjective() + ' ' + faker.animal.rabbit() + ' ' + faker.music.genre(),
      description: faker.lorem.paragraphs(),
      location: newLocation,
      owner: newOwner,
      pricing: newPrice,
      details: newDetails,
      lodging: newLodging,
      essentials: newEssentials,
      amenities: newAmenities,
      activities: newActivities,
      terrain: newTerrain
    }
    // console.log('Overview info: ', newOverview);

    await Overview.create(newOverview)
      .then(result => {
        // console.log(i, 'num of overview Saved!');
      })
      .catch(err => {
        console.log('error creating doc: ', err)
      });
  }

  await Overview.find().exec()
    .then(result => {
      console.log('Number of files seeded: ', result.length)
    })
};

const closeConn = async () => {
  await db.close()
    .then(response => {
      console.log('DB connection closed in seeder ', response)
    })
    .catch(err => {
      console.log('THERE WAS AN ERROR CLOSING THE DB CONNECTION IN SEEDER:');
      console.log(err);
    });
}
module.exports = { seed, closeConn, dbURL }
