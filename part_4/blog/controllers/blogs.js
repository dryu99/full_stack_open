const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const body = request.body;
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
  // decode illegible token to get legible request user data
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // fetch blog we want to delete to get blog's owner data
  const blogToDelete = await Blog.findById(request.params.id);

  // make sure blog to delete exists
  if (!blogToDelete) {
    return response.status(400).json({ error: 'blog doesn\'t exist' });
  }

  if (!blogToDelete.user) {
    return response.status(401).json({ error: 'bad data' });
  }

  // make sure blog's owner === request user
  if (blogToDelete.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'blog doesn\'t belong to user' });
  }

  // delete blog from db
  await blogToDelete.remove();

  // remove blog from user blog data
  const user = await User.findById(decodedToken.id);
  user.blogs = user.blogs.filter(blogId => blogId !== request.params.id);
  await user.save();

  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  if (updatedBlog) {
    response.json(updatedBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  // add new comment to existing comments list
  blog.comments = [...blog.comments, body.comment];

  // save updated blog
  const updatedBlog = await blog.save();

  if (updatedBlog) {
    response.json(updatedBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;