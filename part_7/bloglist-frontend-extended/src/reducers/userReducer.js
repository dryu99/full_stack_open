import loginService from '../services/login';
import blogService from '../services/blogs';
import { changeNotification } from '../reducers/notificationReducer';

const userReducer = (state=null, action) => {
  switch (action.type) {
  case 'INIT_USER': {
    return action.data;
  }
  case 'LOGIN_USER': {
    return action.data;
  }
  case 'LOGOUT_USER': {
    return null;
  }
  default: {
    return state;
  }
  }
};

export const initUser = () => {
  return (dispatch) => {
    // check if user data is available in cache
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);

      // set user token
      blogService.setToken(user.token);

      dispatch({
        type: 'INIT_USER',
        data: user
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      // cache user data
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      // set user token
      blogService.setToken(user.token);

      dispatch({
        type: 'LOGIN_USER',
        data: user
      });
    } catch(error) {
      dispatch(changeNotification('Login failed, invalid username or password!', 'failure', 5));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // remove cached user data
    window.localStorage.removeItem('loggedInUser');

    // reset user token
    blogService.setToken(null);

    dispatch({
      type: 'LOGOUT_USER'
    });
  };
};


export default userReducer;