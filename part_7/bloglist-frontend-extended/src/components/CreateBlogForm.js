import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogsReducer';
import { changeNotification } from '../reducers/notificationReducer';

import { Button, Input } from '../style';

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
        <Input
          id="title-input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}>
        </Input>
      </div>
      <div>
        author:
        <Input
          id="author-input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}>
        </Input>
      </div>
      <div>
        url:
        <Input
          id="url-input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}>
        </Input>
      </div>
      <Button type="submit">create</Button>
    </form>
  );
};

export default CreateBlogForm;