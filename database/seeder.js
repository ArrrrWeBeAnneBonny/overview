const faker = require('faker');
// const database = require('./index');
// console.log(database)
const mongoose = require('mongoose');

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
  checkInTime: String,
  checkOutTime: String,
  cancellationPolicy: String,
  onArrival: String,
  responseTime: String,
  responseRate: String
});

const lodgingSchema = new mongoose.Schema({
  type: String,
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

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
module.exports.seed = async () => {
  await db.dropCollection('owners')
    .then(result => {
      console.log('owners dropped ', result);
    })
    .catch(error => {
      console.log('error: ', error)
    })

  for (let i = 0; i < 5; i++) {
    //---OWNER---
    const imageUrl = faker.image.avatar();
    console.log('owner pic: ', imageUrl);
    const name = faker.name.firstName() + ' ' + alphabet[Math.floor(Math.random() * alphabet.length)] + '.';
    console.log('owner name: ', name);
    const newOwner = {
      name: name,
      imageUrl: imageUrl
    }
    await Owner.create(newOwner)
      .then(result => {
        console.log('Owner Saved: ', result);
      })
      .catch(err => {
        console.log('error creating doc: ', err)
      })
  }
  // const address = faker.address.streetAddress(true);
  // console.log('Address: ', address);



};