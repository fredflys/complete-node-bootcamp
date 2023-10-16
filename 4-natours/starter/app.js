const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1. Middleware
if (process.env.NODE_ENV == 'development') {
  console.log('development');
  app.use(morgan('dev'));
}

// middleware
app.use(express.json());
// serve static files
app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next) => {
  console.log(new Date().toISOString());
  next();
});

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
// mount a router on a route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
