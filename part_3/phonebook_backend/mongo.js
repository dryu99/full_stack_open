const mongoose = require('mongoose')

if (process.argv.length === 3 || process.argv.length === 5) {
  // connect to database
  const password = process.argv[2]
  const url =
    `mongodb+srv://fullstack:${password}@cluster0-yz5za.mongodb.net/phonebook-app?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  // set up document Schema and Model
  const personSchema = new mongoose.Schema({
    name: String,
    number: Number
  });

  const Person = mongoose.model("Person", personSchema);

  // execute requested database query
  if (process.argv.length === 3) {
    // GET
    console.log('fetching all persons...');
    Person.find({}).then(result => {
      console.log('phonebook:');
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  } else {
    // POST
    console.log('adding new person...');
    const name = process.argv[3];
    const number = process.argv[4];
    const newPerson = new Person({
      name: name,
      number: number 
    });

    newPerson.save().then(result => {
      console.log(result);
      mongoose.connection.close();
    });
  }
} else {
  console.log('invalid number of arguments were given, please give 3 or 5');
  process.exit(1)
}