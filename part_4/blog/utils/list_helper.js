const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (acc, currentBlog) => acc + currentBlog.likes,
    0
  );
};

// assume that given list contains at least one blog
const favouriteBlog = (blogs) => {
  return blogs
    .map(blog => {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    })
    .reduce((favouriteBlogSoFar, currentBlog) =>
      favouriteBlogSoFar.likes > currentBlog.likes
        ? favouriteBlogSoFar
        : currentBlog
    );
};

// assume that given list contains at least one blog
const mostBlogs = (blogs) => {
  const authorBlogMap = {};

  blogs.forEach(blog => {
    if (!authorBlogMap[blog.author]) {
      authorBlogMap[blog.author] = 0;
    }

    authorBlogMap[blog.author]++;
  });

  return Object.keys(authorBlogMap)
    .map(author => {
      return {
        author: author,
        blogs: authorBlogMap[author]
      };
    })
    .reduce((acc, current) =>
      acc.blogs > current.blogs
        ? acc
        : current
    );
};

// assume that given list contains at least one blog
const mostLikes = (blogs) => {
  const authorLikesMap = {};

  blogs.forEach(blog => {
    if (!authorLikesMap[blog.author]) {
      authorLikesMap[blog.author] = 0;
    }

    authorLikesMap[blog.author] += blog.likes;
  });

  return Object.keys(authorLikesMap)
    .map(author => {
      return {
        author: author,
        likes: authorLikesMap[author]
      };
    })
    .reduce((acc, current) =>
      acc.likes > current.likes
        ? acc
        : current
    );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};