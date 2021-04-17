import React, { useState } from 'react';

const Login = ({ formSubmitHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(username, password);
    setUsername('');
    setPassword('');
  }
  
  return (
  <form onSubmit={submitHandler}>
    <div>
      Username:
        <input
        required={true}
        type="text"
        value={username}
        name="username"
        onChange={usernameHandler}
      />
    </div>
    <div>
      Password:
        <input
        required={true}
        type="password"
        value={password}
        name="password"
        onChange={passwordHandler}
      />
    </div>
    <button type="submit">Login</button>
  </form>
  )
}

export default Login;
