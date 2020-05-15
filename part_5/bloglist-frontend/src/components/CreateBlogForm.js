import React, { useState } from 'react';

const CreateBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = async (event) => {
    event.preventDefault();
    await addNewBlog({
      title,
      author,
      url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}>
        </input>
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}>
        </input>
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}>
        </input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;