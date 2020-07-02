import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/loginReducer';

import { Navigation, Button } from '../style';

const NavMenu = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login);

  const padding = {
    paddingRight: 5
  };

  return (
    <Navigation>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {loginUser ?
        <React.Fragment>
          <em>{loginUser.name} logged in</em>
          <Button onClick={() => dispatch(logoutUser())}>logout</Button>
        </React.Fragment>
        :
        <Link style={padding} to="/login">login</Link>
      }
    </Navigation>
  );
};

export default NavMenu;