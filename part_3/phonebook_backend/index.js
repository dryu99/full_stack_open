require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const Person = require('./models/person');

// set up pre-processing middleware
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json());
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

// set up routes
app.get('/api/persons', (req, res) => {
  Person.find({}).then(foundPersons => {
    res.json(foundPersons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(foundPerson => {
      if (foundPerson) {
        res.json(foundPerson.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;  
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  })
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then(foundPersons => {
    const infoHtml = `<p>Phonebook has info for ${foundPersons.length} people</p>`
    + `<p>${new Date()}</p>`
    res.send(infoHtml);  
  });
});

// set up post-processing middleware
const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler);

// initialize server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}...`);
});