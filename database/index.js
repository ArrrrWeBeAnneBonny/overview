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
    console.log('DB Connected!')
  });

  // should probs run a test to see if DB has been seeded
  //if not, seed db called seedDB
  await Overview.find().exec()
    .then(result => {
      if (result.length < 100) {
        console.log('Call seed file. Overview not fully seeded. # of docs:', result.length);
        seed();
      }
    });
}

const Overview = mongoose.model('Overview');

testConnection();

