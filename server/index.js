const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 3003;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});