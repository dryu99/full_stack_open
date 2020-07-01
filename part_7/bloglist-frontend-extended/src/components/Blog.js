import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogsReducer';
import { changeNotification } from '../reducers/notificationReducer';
import login from '../services/login';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login);

  if (!blog) {
    return null;
  }

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
    const ownedByLoggedInUser = blog.user.username === loginUser.username;

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
    <div className='blog'>
      <h2>{blog.title}</h2>
      <span>{blog.url}</span>
      <br/>
      <span>likes <span className="likes">{blog.likes}</span></span>
      <button onClick={handleLikeClick}>like</button>
      <br/>
      <span>added by {blog.user.name}</span>
      <br/>
      {loginUser && loginUser.username === blog.user.username ?
        <button onClick={handleRemoveClick}>remove</button>
        :
        null
      }
    </div>
  );
};

export default Blog;

