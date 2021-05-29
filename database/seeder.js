const axios = require('axios');
const faker = require('faker');
const mongoose = require('mongoose');

const { addresses } = require('./addresses.js');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

mongoose.connect('mongodb://127.0.0.1/FEC', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
try {
  db.on('error', () => {
    throw Error('DB Not Connected!')
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
      const twisselman = {
        campId: 0,
        name: 'Twisselman\’s Glamping by the Pond',
        description: `Voted BEST HIPCAMP Glamping in the United States!! Come Glamping & experience our Rual Retreat here at Twisselman Ranch.

        -  Come glamp next to our pond under breathtaking stars located in beautiful Carrisa Plains, California. We are located about 1 hour east of Paso Robles California a short drive off highway 58 and about 1.5 hours west of Bakersfield.

       -  Cozy up in a comfy private canvas wall tent. The tent is fully furnished with a queen bed, side tables, chairs and/or coffee table. The tent also has a screen door and three screen windows to let the fresh breeze cool you off during the day. The tent is set on a raised deck to keep you and your belongings out of the dirt. Outside there is a picnic table or table & several chairs.

       ***Due to COVID guests will need to bring their own bedding/sleeping bag and pillows & towels, no soft furnishings will be provided other than a fitted sheet. This is for your safety & ours ;) ***

       - Tents can comfortably accommodate 2 adults & 3 small children, or 3 adults (twin & kid cots available upon request). If your group is any larger than that we recommend booking multiple glamping tents, or add a campsite ($60) to bring your own tent for the additional guests. Remember for all additional guests you'll need to bring bedding, pillows / cots etc.

       - Dogs are welcome, however, we charge  a $20 pet fee (per pet) due upon arrival.  (We accept cash or venmo)  All dogs must be kept on a leash at all times & never left unattended. There is livestock on the ranch as well as other guests and we want everyone to feel safe.  If your dog is prone to biting please do not bring it!

       -  Carrisa Plains is known for its beautiful display of wild flowers in the spring time, incredible sunny days, and spectacular wildlife viewing. The ranch is also located a short 29 min drive from the Carrizo Plain National Monument and Las Padres National Forest.

        -  Tule elk, prog horn antelope, and valley quail are just some of the animals you may encounter on our ranch. The pond is full of fish (bass, blue gill & sun perch) so don’t forget your fishing poles (catch & release).

       - At our pond camp we have several large shades along with many picnic tables, benches, and chairs scattered around the site.

       - We  have beautiful 2 stall hot water showers, and three stall restroom including handicap stall. **Cleaned & Sanitized DAILY

       -  Our communal kitchen has : a large gas bbq grill, 3 smaller gas grills as well as gas burners & sink. **Cleaned & Sanitized DAILY. There are several counter high prepping tables around the kitchen (please clean up your cooking essentials & food after each meal as everyone shares this space).

       - Seasonal Wood Burning Fires - Start your stay off right by purchasing a firewood bundle 8-10 pieces of wood perfect for bbq and/or evening campfires.

       In summer months we are an ember free site due to high wildfire risks, starting May 1st 2021 - Your $15 per night (additional nights can be payed for upon arrival) rents a propane fire pit, great for roasting s’mores & the ambience of camping. Please do not cook any meals on them. All cooking is to be done in the communal kitchen area.

       -  The summer days can get pretty toasty and the winter nights can get very chilly so check the weather before your stay and plan accordingly. Don’t forget your swim suits as we have soaking troughs for you to cool off in.

       -  Also please note we are located an hour from the nearest town, no stores or gas stations. Please come fully equipped with your own utensils, cooking essentials, food and beverages. We sell ICE!! $5 per 5lb bag.

       -We are off grid, there is no electricity, all lights are battery or solar powered. You may want a flashlight or headlamp for walking around at night.

       - We have recently started selling grass fed beef & jerky, hats & coffee mugs straight from the ranch to our local community & visiting guests. If your interested in purchasing some wholesome delicious beef during your stay please visit Twisselman Ranch . Com  be sure to specify in comment at check out that your a guest & if you’d  like it during your stay or on departure. All beef is frozen in vacuum sealed bags.

       - Cellular Service - Verizon is the only dependable steady service out here as we have a Verizon tower on the ranch. All other service is spotty if existent at all.

       - Check in is anytime after 3pm, but no later than 9pm unless arranged with us (a $20 late fee will apply after 9pm). Check out is 11am on the day of departure.

       Instagram @temblormountainpacktrain #temblormountainpacktrain #camptheranch #twisselmanranch`,
        location: {
          name: 'Twisselman Ranch',
          address: '7645 Cattle Dr Santa Margarita, CA 93453',
          verified: true
        },
        owner: {
          name: 'Anne B.',
          imageUrl: 'https://fec-overview.s3-us-west-2.amazonaws.com/ownerPics/cartoonAB.jpeg',
          verified: true
        },
        pricing: {
          averagePricePerNight: 165,
          cleaningFee: 15,
          monthsOutForBooking: 6,
          minimumNights: 1,
          weeknightDiscount: .2,
          instantBook: true
        },
        details: {
          checkInTime: 15,
          checkOutTime: 11,
          cancellationPolicy: 4,
          onArrival: 1,
          weeknightDiscount: .2,
          responseTime: 0,
          responseRate: 0
        },
        lodging: {
          type: 1,
          numberOfSites: 5,
          maxGuestsPerSite: 5,
          ADAaccess: false,
          parking: true
        },
        essentials: {
          campfires: true,
          toilet: true,
          pets: true
        },
        amenities: {
          potableWater: {
            available: false,
            types: 0,
            description: ''
          },
          kitchen: {
            available: true,
            types: [1],
            description: 'Communal Kitchen Area includes: Sink, gas bbq grill, gas burners NO : pots, pans, cooking utensils etc. Please come fully prepared with all the nessecary essentials'
          },
          shower: {
            available: true,
            types: 1,
            description: 'We have a beautiful two stall hot water shower'
          },
          picnicTable: {
            available: true,
            description: ''
          },
          wifi: {
            available: false,
            description: ''
          },
          bins: {
            available: true,
            types: [0],
            description: 'Trash barrels throughout the site'
          }
        },
        activities: {
          biking: false,
          fishing: true,
          hiking: true,
          horsebackRiding: false,
          boating: false,
          offRoading: false,
          whitewaterPaddling: false,
          climbing: false,
          snowsports: false,
          surfing: false,
          windsports: false,
          swimming: false,
          paddling: true,
          wildlifeWatching: true,
          surfing: false
        },
        terrain: {
          lake: true,
          beach: false,
          forest: false,
          reviewStreamCreek: false,
          hotSpring: false,
          swimmingHole: false,
          desert: false,
          cave: false,
          waterfall: false,
          ranch: true,
          driveway: false
        }
      }
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
module.exports = { seed, closeConn }
