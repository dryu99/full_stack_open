const express = require('express');
const app = express();
const blogRouter = require('./controllers/blogs');
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
app.use(middleware.requestLogger);

// initialize routers
app.use('/api/blogs', blogRouter);

// set up post-middleware

module.exports = app;