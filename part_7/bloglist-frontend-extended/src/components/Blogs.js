import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';

import { BlogLink } from '../style';

const Blogs = () => {
  const blogs = useSelector(state => {
    return state.blogs.sort((b1, b2) => b2.likes - b1.likes); // sort blogs in descending order of likes
  });

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create new">
        <CreateBlogForm />
      </Togglable>
      {blogs.map(blog =>
        <BlogLink key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </BlogLink>
      )}
    </div>
  );
};

export default Blogs;