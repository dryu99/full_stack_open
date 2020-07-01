import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setPassword('');
    history.push('/');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;