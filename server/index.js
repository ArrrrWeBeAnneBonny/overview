const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');
const express = require('express');

const app = express();
const port = 3003;



app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5500',
];
app.use(cors());
app.use(cors({ origin: allowedOrigins }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static('public'))
app.use(express.static('dist'));

app.get('/overview', async (req, res) => {
  // console.log('overview request query: ', req.query);
  let campId = parseInt(req.query.campId);

  if (typeof campId !== 'number') {
    campId = 0;
  }

  let data = await db.generalLookup(campId);

  res.send(data);
});

app.get('/overview/location', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.locationLookup(campId);

  res.send(data);
});

app.get('/overview/owner', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.ownerLookup(campId);

  res.send(data);
});

app.get('/overview/pricing', async (req, res) => {
  let campId = parseInt(req.query.campId);
  if (!campId) {
    campId = 0;
  }

  let data = await db.pricingLookup(campId);
  console.log(data)
  res.send(data);
});

app.get('/overview/all', async (req, res) => {
  console.log('overview request query: ', req.query);
  let campId = parseInt(req.query.campId);
  if (typeof campId !== 'number') {
    campId = 0;
  }
  console.log('requested campId = ', campId)

  let data = await db.overviewLookup(campId);
  await axios.get('http://localhost:3001/reviews', { params: { campId } })
    .then(response => {
      // console.log('Review API Call response ', response.data);
      console.log('Accessed Review Service!!');
      data.header = { percentRec: response.data.recommendedPer };
    })
    .catch(error => {
<<<<<<<
      console.log('Unable to Access Review Service...');
      // console.log(error);
      data.header = { percentRec: false };

=======
      // console.log('Error Ocurred: ', error);
      console.log('Please note error occured in the review lookup')      
      data.header = {
        percentRec: false
      }
      // res.send('Please note error occured in the review lookup')      
>>>>>>>
    })
    // console.log(data);
    res.send(data);
});