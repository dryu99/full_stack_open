import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, removeBlog, addComment } from '../reducers/blogsReducer';
import { changeNotification } from '../reducers/notificationReducer';
import login from '../services/login';
import Togglable from './Togglable';

import { Button, Input } from '../style';

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login);

  if (!blog) {
    return null;
  }

  // Componenet references:
  const commentInputReference = React.createRef();

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

  const handleCommentClick = () => {
    dispatch(addComment(blog.id, comment));
    setComment('');
    commentInputReference.current.toggleVisibility();
  };

  const handleRemoveClick = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
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
      <h3>{blog.title}</h3>
      <span>{blog.url}</span>
      <br/>
      <span>likes <span className="likes">{blog.likes}</span></span>
      <Button onClick={handleLikeClick}>like</Button>
      <br/>
      <span>added by {blog.user.name}</span>
      <br/>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, i) =>
          <li key={i + comment}>{comment}</li>
        )}
      </ul>
      {loginUser && loginUser.username === blog.user.username ?
        <Button onClick={handleRemoveClick}>remove</Button>
        :
        null
      }
      <Togglable buttonLabel={'add comment'} ref={commentInputReference}>
        <Input
          value={comment}
          onChange={({ target }) => setComment(target.value)}>
        </Input>
        <Button onClick={handleCommentClick} >comment</Button>
      </Togglable>
    </div>
  );
};

export default Blog;

