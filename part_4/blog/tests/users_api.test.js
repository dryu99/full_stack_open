const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const testHelper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

// Initializes a test "server" that runs imported express app.
// We can make HTTP requests to this "server" through the api object
const api = supertest(app);

describe('HTTP verb tests when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('tesuserpasswordwhoa', 10);
    const userObject = new User({
      username: 'testuser99',
      name: 'Test User',
      passwordHash
    });

    await userObject.save();
  });

  describe('POST', () => {
    test('succeeds with status 200: add a valid user', async () => {
      const usersAtStart = await testHelper.usersInDb();

      const newUser = {
        username: 'johndoe99',
        name: 'John Doe',
        password: 'anotherpassword'
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await testHelper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    });

    test('fails with status 400: add an invalid user with short username', async () => {
      const usersAtStart = await testHelper.usersInDb();

      const newUser = {
        username: 'jo',
        name: 'John Doe',
        password: 'anotherpassword'
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      expect(response.body.error).toContain('shorter than the minimum allowed length');

      const usersAtEnd = await testHelper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test('fails with status 400: add duplicate user', async () => {
      const usersAtStart = await testHelper.usersInDb();

      const newUser = {
        username: 'testuser99',
        name: 'John Doe',
        password: 'anotherpassword'
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      expect(response.body.error).toContain('expected `username` to be unique.');

      const usersAtEnd = await testHelper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});