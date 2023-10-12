const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    // no need to set content-type to applicatoin/json anymore
    .json({ message: 'Home page from server!', app: 'natrous' });
});

app.post('/', (req, res) => {});

app.listen(3000, () => {
  console.log('App running on port: 3000');
});
