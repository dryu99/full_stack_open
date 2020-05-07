const supertest = require('supertest');
const mongoose = require('mongoose');
const testHelper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

// Initializes a test "server" that runs imported express app.
// We can make HTTP requests to this "server"
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog));
  const promises = blogObjects.map(blogObject => blogObject.save());
  await Promise.all(promises);
});

describe('GET', () => {
  test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returned blogs have "id" property instead of "_id"', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    });
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(testHelper.initialBlogs.length);
  });
});

describe('POST', () => {
  test('add a valid blog', async () => {
    const newBlog = {
      title: 'franklin\'s blog',
      author: 'franklin',
      url: 'www.franklin.com',
      likes: 99
    };

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    newBlog.id = postResponse.body.id;

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length + 1);
    expect(blogsAtEnd).toContainEqual(newBlog);
  });

  test('add valid blog with missing "likes" prop', async () => {
    const newBlog = {
      title: 'franklin\'s blog',
      author: 'franklin',
      url: 'www.franklin.com',
    };

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(postResponse.body.likes).toBe(0);
  });

  test('add invalid blog with missing props that are required', async () => {
    const newBlog = {
      author: 'franklin'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length);
  });
});


afterAll(() => {
  mongoose.connection.close();
});