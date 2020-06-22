import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { changeNotification } from '../reducers/notificationReducer';

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      dispatch(addBlog({ title, author, url }));
      dispatch(changeNotification('New Blog created successfully!', 'success', 5));

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      dispatch(changeNotification('New Blog couldn\'t be created...', 'failure', 5));
    }
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          id="title-input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}>
        </input>
      </div>
      <div>
        author:
        <input
          id="author-input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}>
        </input>
      </div>
      <div>
        url:
        <input
          id="url-input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}>
        </input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;