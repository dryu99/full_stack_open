import React, { useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './reducers/blogsReducer';
import { initUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => {
    return blogs.sort((b1, b2) => b2.likes - b1.likes); // sort blogs in descending order of likes
  });

  const user = useSelector(({ user }) => {
    return user;
  });

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

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
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
      ) : (
        <div>
          <h2>login to application</h2>
          <LoginForm/>
        </div>
      )}
    </div>
  );
};

export default App;