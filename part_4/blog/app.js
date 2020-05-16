const express = require('express');
require('express-async-errors');
const app = express();
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');

// connect to database
logger.info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message);
  });

// set up pre-middleware
app.use(middleware.cors());
app.use(middleware.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

// initialize routers
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  console.log('enabling testing router');
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}


// set up post-middleware
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;