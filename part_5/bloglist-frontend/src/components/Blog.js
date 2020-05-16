import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  const handleLikeClick = async () => {
    await updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }, blog.id);
  };

  const handleRemoveClick = async () => {
    const ownedByLoggedInUser = blog.user.username === user.username;

    if(ownedByLoggedInUser && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog.id);
    } else {
      alert('You cannot delete blogs you don\'t own!');
    }
  };

  return (
    <div className='blog' style={blogStyle}>
      <div className="default-view">
        <span>{blog.title} {blog.author}</span>
        <button className="toggle-button"onClick={toggleDetails}>{viewDetails ? 'hide' : 'view'}</button>
      </div>
      <div className="detailed-view" style={viewDetails ? null : { display: 'none' }}>
        <span>{blog.url}</span>
        <br/>
        <span>likes <span className="likes">{blog.likes}</span></span>
        <button onClick={handleLikeClick}>like</button>
        <br/>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;

