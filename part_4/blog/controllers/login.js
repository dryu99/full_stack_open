const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  const isPasswordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    return response.status(401).send({
      error: 'invalid username or password'
    });
  }

  // otherwise, generate token
  const decodedToken = {
    username: body.username,
    id: user._id
  };

  const token = jwt.sign(decodedToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;