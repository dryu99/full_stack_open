const testHelper = require('./test_helper');
const listHelper = require('../utils/list_helper');

const listWithMultipleBlogs = testHelper.initialBlogs;
const listWithOneBlog = [testHelper.initialBlogs[1]];

test('dummy returns 1', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  test('empty list', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('list with 1 blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('list with many blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe('favouriteBlog', () => {
  test('list with 1 blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('list with many blogs', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('mostBlogs', () => {
  test('list with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    });
  });

  test('list with many blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('mostLikes', () => {
  test('list with 1 blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    });
  });

  test('list with many blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});