const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// get rid of deprecation warnings
mongoose.set('useCreateIndex', true);

// connect to database
const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error);
  });

// set up Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type: Number,
    required: true,
    min: 10000000
  }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// set up Model - entry point to 'persons' collection in database where all our 'Person' documents are stored
const Person = mongoose.model('Person', personSchema);

module.exports = Person;