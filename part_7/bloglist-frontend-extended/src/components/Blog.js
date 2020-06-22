import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogsReducer';
import { changeNotification } from '../reducers/notificationReducer';

const Blog = ({ blog, user }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const dispatch = useDispatch();

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

  const handleLikeClick = () => {
    try {
      dispatch(updateBlog({
        ...blog,
        likes: blog.likes + 1
      }, blog.id));
      dispatch(changeNotification('Blog updated successfully!', 'success', 5));
    } catch (error) {
      dispatch(changeNotification('New Blog couldn\'t be created...', 'failure', 5));
    }
  };

  const handleRemoveClick = async () => {
    const ownedByLoggedInUser = blog.user.username === user.username;

    if(ownedByLoggedInUser && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(changeNotification('Blog removed successfully!', 'success', 5));
      } catch (error) {
        dispatch(changeNotification('Blog couldn\'t be removed...', 'failure', 5));
      }
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
};

export default Blog;

