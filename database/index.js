const {seed, closeConn} = require('./seeder.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview');
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
      } else {
        closeConn();
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
        console.log('Query returned: ', query)
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
      // console.log(response)
      return response;
  },

  locationLookup: async (campId) => {
    let response = {};
    await Overview.find({campId}, 'location lodging').exec()
      .then(query => {
        console.log('Query returned: ', query)
        let info = query[0];
        response.location = {
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
    await Overview.find({campId: campId}, 'owner').exec()
      .then(query => {
        console.log('Query returned: ', query)
        let info = query[0];
        response = {
          name: info.owner.name,
          address: info.owner.imageUrl,
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
    await Overview.find({campId}, 'pricing').exec()
      .then(query => {
        console.log('Query returned: ', query)
        let info = query[0];
        response = {
          name: info.owner.name,
          address: info.owner.imageUrl,
        };
      })
      .catch(error => {
        console.log('ERROR FINDING CAMPID');
        console.log(error);
      });
      return response;
  }
}
