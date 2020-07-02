import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import NavMenu from './components/NavMenu';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import { initBlogs } from './reducers/blogsReducer';
import { initLogin } from './reducers/loginReducer';
import { initUsers } from './reducers/usersReducer';

import { Page } from './style';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);
  const loginUser = useSelector(state => state.login);

  useEffect(() => {
    dispatch(initLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  const userMatch = useRouteMatch('/users/:id');
  const currentUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const currentBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null;

  return (
    <Page>
      <Notification notification={''}/>
      <NavMenu />
      <h2>Blog App</h2>
      <Switch>
        <Route path="/users/:id">
          <User user={currentUser}/>
        </Route>
        <Route path="/users">
          {loginUser ? <Users /> : <h3>login please!</h3>}
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={currentBlog}/>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          {loginUser ? <Blogs /> : <h3>login please!</h3>}
        </Route>
      </Switch>
    </Page>
  );
};

export default App;
