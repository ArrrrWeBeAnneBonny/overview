const {seed} = require('./seeder.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

const testConnection = async () => {
  db.on('error', () => {
    console.log('ERROR! DB no Connected...')
  });
  db.once('open', () => {
    console.log('DB Connected!!')
  });

  // should probs run a test to see if DB has been seeded
  //if not, seed db called seedDB
  await Overview.find().exec()
    .then(result => {
      if (result.length === 0) {
        console.log('overview empty');
        seed();
      }
    })
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

testConnection();

module.exports = {
  db,
  Location,
  Owner,
  Pricing,
  Details,
  Lodging,
  Essentials,
  Amenities,
  Activities,
  Terrain,
  Overview
 };
