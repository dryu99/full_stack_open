import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/loginReducer';

const NavMenu = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.login);

  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {loginUser ?
        <React.Fragment>
          <em>{loginUser.name} logged in</em>
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </React.Fragment>
        :
        <Link style={padding} to="/login">login</Link>
      }
    </div>
  );
};

export default NavMenu;