import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchInitialBlogs();
  }, []);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      );
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      console.log(e);
    }
  };
  const logoutHandler = (e) => {
    window.localStorage.removeItem('loggedInBlogUser');
    blogService.setToken(null);
    setUser(null);
  }
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Homepage
      user={user}
      blogs={blogs}
      submitHandler={submitHandler}
      username={username}
      password={password}
      usernameHandler={usernameHandler}
      passwordHandler={passwordHandler}
      logoutHandler={logoutHandler}
    />
  );
};

export default App;