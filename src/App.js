import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import blogService from './services/blogs';
import loginService from './services/login';
import messages from './components/Message';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const setSuccessMsgWrapper = (msg, clearTime = 3000) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), clearTime);
  }

  const setErrorMsgWrapper = (msg, clearTime = 3000) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), clearTime);
  }

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

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      );
      setSuccessMsgWrapper('Logged in Successfully');
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMsgWrapper('Login Error - incorrect username or password');
    }
  };
  const blogSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await blogService.createBlog({ author, title, url });
      setBlogs(blogs.concat(res));
      setSuccessMsgWrapper(`Added - ${res.title} into blogs list.`);
      setAuthor('');
      setTitle('');
      setUrl('');
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const logoutHandler = (e) => {
    window.localStorage.removeItem('loggedInBlogUser');
    blogService.setToken(null);
    setUser(null);
    setSuccessMsgWrapper('Logged out successfully');
  }
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const authorHandler = (e) => {
    setAuthor(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const urlHandler = (e) => {
    setUrl(e.target.value);
  };
  
  return (
    <>
    <messages.ErrorMessage msg={errorMsg} />
    <messages.SuccessMessage msg={successMsg} />
    <Homepage
      user={user}
      blogs={blogs}
      loginSubmitHandler={loginSubmitHandler}
      username={username}
      password={password}
      usernameHandler={usernameHandler}
      passwordHandler={passwordHandler}
      logoutHandler={logoutHandler}
      author={author}
      title={title}
      url={url}
      authorHandler={authorHandler}
      titleHandler={titleHandler}
      urlHandler={urlHandler}
      blogSubmitHandler={blogSubmitHandler}
    />
    </>
  );
};

export default App;