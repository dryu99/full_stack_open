const morgan = require('morgan');
const express = require('express');
const app = express();

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  // error handling
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    });
  } else {
    const person = persons.find(person => person.name === body.name);
    if (person) {
      return res.status(400).json({
        error: 'person already exists'
      });
    }
  }

  const newPerson = {
    ...body,
    id: generateId()
  }

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const generateId = () => {
  console.log();
  const maxId = persons.reduce((acc, currentPerson) => Math.max(acc, currentPerson.id), 0);
  const offset = Math.ceil(Math.random() * 10) // random num between 1 - 10
  return maxId + offset;
}

app.get('/info', (req, res) => {
  const infoHtml = `<p>Phonebook has info for ${persons.length} people</p>`
    + `<p>${new Date()}</p>`
  res.send(infoHtml);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}...`);
});