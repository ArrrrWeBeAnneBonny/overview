const seedDB = require('./seeder.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const testConnection = () => {
  db.on('error', () => {
    console.log('ERROR! DB no Connected...')
  });
  db.once('open', () => {
    console.log('DB Connected!!')
  });
}
testConnection();

// SCHEMAS
