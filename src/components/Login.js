import React from 'react';

const Login = ({ username, password, submitHandler, usernameHandler, passwordHandler }) => (
  <form onSubmit={submitHandler}>
    <div>
      Username:
        <input
        type="text"
        value={username}
        name="username"
        onChange={usernameHandler}
      />
    </div>
    <div>
      Password:
        <input
        type="password"
        value={password}
        name="password"
        onChange={passwordHandler}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default Login;
