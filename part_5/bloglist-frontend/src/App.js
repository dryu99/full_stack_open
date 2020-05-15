import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function getAllBlogs() {
      const blogs = await blogService.getAll();
      setBlogs( blogs );
    }
    getAllBlogs();
  }, []);

  // check if user data is available in cache
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      // cache user data
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      alert('login failed, invalid username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog, user.token);
      setBlogs(blogs.concat(createdBlog));
    } catch (exception) {
      console.error(exception);
    }
  };

  const updateBlog = async (blog, id) => {
    try {
      const updatedBlog = await blogService.update(blog, id);
      setBlogs(blogs.map(b => b.id === id ? updatedBlog : b));
    } catch (exception) {
      console.error(exception);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id, user.token);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (exception) {
      console.error(exception);
    }
  };

  // sort blogs in descending order of likes
  const likeSortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes);

  if (user === null) {
    return (
      <div>
        <h2>login to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>

        <h2>create new</h2>
        <Togglable buttonLabel="new blog">
          <CreateBlogForm
            addNewBlog={addNewBlog}
          />
        </Togglable>
        {likeSortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        )}
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
};

export default App;