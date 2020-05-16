import React from 'react';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin
}) => {
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