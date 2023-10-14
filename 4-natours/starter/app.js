const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1. Middleware
app.use(morgan('dev'));
// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toISOString());
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

// 2. Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const reqId = req.params.id * 1;
  const tour = tours.find((item) => item.id === reqId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Done');
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {};
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'Deleted',
  });
};
// get
// app.get('/api/v1/tours', getAllTours);
// get parameters
// app.get('/api/v1/tours/:id', getTour);
// post
// app.post('/api/v1/tours', createTour);
// patch only expects the properties that need to be updated on the object
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3. Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4. Start server
app.listen(3000, () => {
  console.log('App running on port: 3000');
});
