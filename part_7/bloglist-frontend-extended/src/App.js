import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogsReducer';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    // sort blogs in descending order of likes
    return blogs.sort((b1, b2) => b2.likes - b1.likes);
  });

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  // check if user data is available in cache
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      // cache user data
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

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

  return (
    <div>
      <Notification notification={''}/>
      {user ? (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>

          <h2>create new</h2>
          <Togglable buttonLabel="new blog">
            <CreateBlogForm />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          )}
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default App;