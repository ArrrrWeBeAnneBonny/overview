const {seed} = require('./seeder.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true, useUnifiedTopology: true });
db = mongoose.connection;

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

// -----MODELS-----
const Location = mongoose.model('Location');
const Owner = mongoose.model('Owner');
const Pricing = mongoose.model('Pricing');
const Details = mongoose.model('Details');
const Lodging = mongoose.model('Lodging');
const Essentials = mongoose.model('Essentials');
const Amenities = mongoose.model('Amenities');
const Activities = mongoose.model('Activities');
const Terrain = mongoose.model('Terrain');
const Overview = mongoose.model('Overview');

testConnection();

