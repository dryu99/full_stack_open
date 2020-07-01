import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';

const Blogs = () => {
  const blogs = useSelector(state => {
    return state.blogs.sort((b1, b2) => b2.likes - b1.likes); // sort blogs in descending order of likes
  });

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <Togglable buttonLabel="create new">
        <CreateBlogForm />
      </Togglable>
      {blogs.map(blog =>
        <div key={blog.id} style={style}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blogs;