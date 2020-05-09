const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users.map(u => u.toJSON()));
});

userRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.password || body.password.length < 3) {
    return response.status(400).send({ error: 'missing or invalid password' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await newUser.save();
  response.json(savedUser.toJSON());
});

module.exports = userRouter;